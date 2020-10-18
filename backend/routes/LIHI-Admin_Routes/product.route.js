let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

    let productSchema = require('../Models/product');

    
        
// @url /discount/create-discount/:id
// @description create order 

router.route('/create-product').post((req, res, next) => {
    productSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// @url /discount/get-discount
// @description retrieve

router.route('/').get((req, res) => {
    productSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});



//Get Single Product
router.route('/get-product/:id').get((req, res) => {
    productSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


// @url /discount/update-discount/:id
// @description update order by id

router.route('/update-discount/:id').put((req, res, next) => {
    productSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Discount updated successfully !')
        }
    })
})

// @url /discount/delete-discount/:id
// @description delete order by id

router.route('/delete-discount/:id').delete((req, res, next) => {
    productSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
module.exports = router;
    
