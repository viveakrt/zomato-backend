const verify = require('./verifyToken');

const {
    placeOrder,
    inOrder
} = require("../models");


const router = require("express").Router();

router.put('/placeOrder', verify, (req, res) => {
    const val = req.body.items;
    placeOrder.create({
            order_time: new Date(),
            restaurant_id: req.body.restaurantId,
            customer_id: req.body.customerId,
            price: req.body.price,
            comment: req.body.comment,
            address: req.body.address
        }).then((data) => {
            Object.keys(val).forEach(element => {
                inOrder.create({
                    PlaceOrder_id: data.dataValues.id_place_order,
                    Food_item_id: Number(element),
                    quantity: val[element],
                })
            });
            res.status(200).json({
                message: "ORDER PLACED"
            }).end();
        })
        .catch((err) => {
            console.log(err);

            res.status(500).json({
                message: err
            }).end();
        })
})

router.get('/myOrder', verify, (req, res) => {
    const id = req.body.customerId;
    placeOrder.findAll({
            where: {
                customer_id: id
            }
        }).then((order) => {
            if (order.length > 0) {
                res.status(200).json(order).end();
            } else {
                res.sendStatus(404).end();
            }
        })
        .catch((err) => {
            console.log(err);

            res.sendStatus(500).end();
        });
})


module.exports = router