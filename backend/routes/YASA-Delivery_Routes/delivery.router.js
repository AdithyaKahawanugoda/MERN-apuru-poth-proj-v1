
const router = require('express').Router();
let Delivery = require('../../models/YASA-Delivery/delivery.model');

//@route            /delivery
//@description      fetch delivery details
router.route('/').get((req, res) => {
  Delivery.find()
    .then(delivery => res.json(delivery))
    .catch(err => res.status(400).json('Error: ' + err));
});

//@route           delivery/add
//@description     Inserting delivery information
router.route('/add').post((req, res) => {
  const _id = req.body._id;  
  const destination = req.body.destination;
  const method = req.body.method;
  const handoverdate = Date.parse(req.body.handoverdate);
  const receiver = req.body.receiver;
  const noofbooks = Number(req.body.noofbooks);
  const deliverydate = Date.parse(req.body.deliverydate);

  const newDelivery = new Delivery({
    _id,
    destination,
    method,
    handoverdate,
    receiver,
    noofbooks,
    deliverydate,
  });

  newDelivery.save()
  .then(() => res.json('Delivery added!'))
  .catch((err)=> {
    res.status(500).json('Error: ' + err)
    console.log(err)
  });
});

//@route          deliveryG M/:id
//@description    fetch delivery information that you want by giving it's id
router.route('/:id').get((req, res) => {
    Delivery.findById(req.params.id)
      .then(delivery => res.json(delivery))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  //@route          delivery/update/:id
//@description     update relavant delivery infor
router.route('/update/:id').post((req, res) => {
  Delivery.findById(req.params.id)
    .then(delivery => {
      
      delivery.destination = req.body.destination;
      delivery.method = req.body.method;
      delivery.handoverdate = Date.parse(req.body.handoverdate);
      delivery.receiver = req.body.receiver;
      delivery.noofbooks = Number(req.body.noofbooks);
      delivery.deliverydate = Date.parse(req.body.deliverydate);

      delivery.save()
        .then(() => res.json('delivery updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

  //@route             delivery/:id
  //@description        delete relavant delivery 
  router.route('/:id').delete((req, res) => {
    Delivery.findByIdAndDelete(req.params.id)
      .then(() => res.json('delivery deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;