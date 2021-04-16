const verify = require('./verifyToken');
const {
    restaurant,
    foodItem
} = require("../models");
const {
    Op
} = require("sequelize");

const router = require("express").Router();

router.get('/restaurant/:val', verify, (req, res) => {
    const val = req.params.val
    restaurant.findAll({
        where: {
            restaurant_name: {
                [Op.substring]: val,
            }
        }
    }).then((dat) => {
        if (dat.length > 0) {
            res.status(200).json(dat).end();
        } else {
            res.status(404).json({
                message:'NOT FOUND'
            }).end();
        }
    })
    .catch((err) => {
        console.log(err);

        res.status(500).json({
            message:'Internal server error'
        }).end();
    });
})

module.exports = router