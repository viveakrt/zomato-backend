const verify = require('./verifyToken');
const {
    restaurant,
    location,
    review
} = require("../models");

const router = require("express").Router();

router.get("/all", verify, (req, res) => {

    restaurant.findAll({

        include: [{
            model: location,
            as: "Location_idLocation_locations",
            attributes: ['latitude','longitude'],
            through: {
                attributes: [],
            }
        },{
            model: review,
            as: "reviews",
            attributes: ['rating','comment'],
        }]

    })
        .then((restaurant) => {
            if (restaurant.length > 0) {
                res.status(200).json(restaurant).end();
            } else {
                res.sendStatus(404).end();
            }
        })
        .catch((err) => {
            console.log(err);

            res.sendStatus(500).json({
                message:err
            }).end();
        });
});

router.get("/all/:id", verify, (req, res) => {
    const city = req.params.id
    restaurant.findAll({
            where: {
                city_name: city,
            },
            
                include: [{
                    model: location,
                    as: "Location_idLocation_locations",
                    attributes: ['latitude','longitude'],
                    through: {
                        attributes: [],
                    }
                },{
                    model: review,
                    as: "reviews",
                    attributes: ['rating','comment'],
                }]
        })
        .then((restaurant) => {
            if (restaurant.length > 0) {
                res.status(200).json(restaurant).end();
            } else {
                res.sendStatus(404).end();
            }
        })
        .catch((err) => {
            console.log(err);

            res.sendStatus(500).end();
        });
});

module.exports = router;