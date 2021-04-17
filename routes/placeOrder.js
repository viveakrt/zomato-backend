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
    placeOrder.create({
            order_time: new Date(),
            restaurant_id: req.body.restaurantId,
            customer_id: req.body.customerId,
            price: req.body.price,
            comment: req.body.comment,
            address: req.body.address
        }).then((data) => {
            const placeOrderID = data.dataValues.id_place_order;
            const token = req.header('authorization')
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authorizedData) => {
                if (err) {
                    res.status(403).json({
                        message: 'Could not connect to the protected route'
                    });
                } else {
                    const output = `
                    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                    
                    <head>
                        <meta charset="UTF-8">
                        <meta content="width=device-width, initial-scale=1" name="viewport">
                        <meta name="x-apple-disable-message-reformatting">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta content="telephone=no" name="format-detection">
                        <title></title>
                        <!--[if (mso 16)]>
                        <style type="text/css">
                        a {text-decoration: none;}
                        </style>
                        <![endif]-->
                        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                        <!--[if gte mso 9]>
                    <xml>
                        <o:OfficeDocumentSettings>
                        <o:AllowPNG></o:AllowPNG>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                    </head>
                    
                    <body>
                        <div class="es-wrapper-color">
                            <!--[if gte mso 9]>
                                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                    <v:fill type="tile" color="#f8f9fd"></v:fill>
                                </v:background>
                            <![endif]-->
                            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td class="esd-email-paddings" valign="top">
                                            <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-stripe" align="center" bgcolor="#f8f9fd" style="background-color: #f8f9fd;">
                                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-structure es-p10t es-p15b es-p30r es-p30l" align="left">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="540" class="esd-container-frame" align="center" valign="top">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://demo.stripocdn.email/content/guids/cb65e6e7-e37d-4c44-a8db-b00b456c7ee5/images/72821618641321821.png" alt style="display: block;" width="340"></a></td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td align="left" class="esd-block-text">
                                                                                                            <p><br></p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text es-p20">
                                                                                                            <h1>Hi Foodie,</h1>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" class="esd-block-text">
                                                                                                            <h2 style="line-height: 150%;">&nbsp;Your Order is placed with Order Id ${placeOrderID} &nbsp;<br>And delivered to address ${req.body.address}:&nbsp;<br>Order total Price is  ${req.body.price}:&nbsp; <br><br>We know COVID 19 on boom we insure your safty while delievering the food.<br>Wear mask and Stay Safe.&nbsp;</h2>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </body>
                    
                    </html>
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

});

router.post('/myOrder', verify, (req, res) => {
    const id = req.body.customerId;
    placeOrder.findAll({
            where: {
                customer_id: id
            }
        }).then(async (order) => {
            console.log()
            if (order.length > 0) {
                let rest = [];
                for (i = 0; i < order.length; i++) {
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