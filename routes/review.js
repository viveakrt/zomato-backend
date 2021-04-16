
const verify = require('./verifyToken');
const {
    review
} = require('../models');

const router = require("express").Router();

router.put('/review',verify,(req,res)=>{
    review.create({
        id_customer:req.body.customerId,
        id_restaurant:req.body.restaurantId,
        rating:req.body.rating,
        comment:req.body.comment
    }).then(()=>{
        res.status(200).json({
            message:'Review Added'
        }).end()
    }).catch((err)=>{
        res.status(500).json({
            message:err
        }).end()
    })
})

module.exports = router;