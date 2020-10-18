const router = require('express').Router();
let User = require('../../models/JAYE-order/order.model');//model we created

 

//Handle incoming HTTP GET requests under /user url
router.route('/').get((req, res) => {
 //(find)mongoose method that get the list of all  the users from themongodb atlas databse
  User.find() 
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

 

 

module.exports = router;