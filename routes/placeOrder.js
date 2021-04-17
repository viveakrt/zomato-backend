const verify = require('./verifyToken');
const dotenv = require('dotenv');
dotenv.config();
const {
    placeOrder,
    inOrder,
    restaurant,
} = require("../models");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const router = require("express").Router();
const mailGun = require('nodemailer-mailgun-transport');

router.put('/placeOrder', verify, (req, res) => {
    const val = req.body.items;
    let placeOrderID;
    placeOrder.create({
            order_time: new Date(),
            restaurant_id: req.body.restaurantId,
            customer_id: req.body.customerId,
            price: req.body.price,
            comment: req.body.comment,
            address: req.body.address
        }).then((data) => {
            placeOrderID = data.dataValues.id_place_order;
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
        });
    const token = req.header('authorization')
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authorizedData) => {
        if (err) {
            res.status(403).json({
                message: 'Could not connect to the protected route'
            });
        } else {
            const output = `
    <style>      
    body {
        background-color: #f6f6f6;
        width: 100%; 
    }
    h1 {
        color : green;
    }
    </style>
    <h1> Hello Foodies!!</h1>
    <h2>Your Place Order Id is ${placeOrderID} and total order price ${req.body.price}</h2>
    <h2>will delivered to your address ${req.body.address} </h2>
    `;
            const auth = {
                auth: {
                    api_key: process.env.MAILGUN_API_KEY,
                    domain: process.env.MAILGUN_DOMAIN
                },

            };
            const transporter = nodemailer.createTransport(mailGun(auth));

            const mailOptions = {
                from: {
                    name: 'Zomato',
                    address: 'noreply@zomato-clonee.com'
                },
                to: {
                    name: "Foodies",
                    address: authorizedData.email
                },
                subject: 'Order PLaced',
                text: `Hi , You orderId id is ${placeOrderID}`,
                html: output,
            };

            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('MESSAGE SEND!!!');
                }
            });
        }
    });
});

router.post('/myOrder', verify,  (req, res) => {
    const id = req.body.customerId;
    placeOrder.findAll({
            where: {
                customer_id: id
            }
        }).then( async (order) => {
            console.log()
            if (order.length > 0) {
                let rest=[];
                for(i=0;i<order.length;i++){
                    rest[i] = await restaurant.findByPk(order[i].restaurant_id)
                }

                res.status(200).json({
                    order,
                    rest
                }).end();
            } else {
                res.sendStatus(404).json({
                    message: "NOT FOUND"
                }).end();
            }
        })
        .catch((err) => {
            console.log(err);

            res.sendStatus(500).end();
        });
})


module.exports = router