const verify = require('./verifyToken');
const {
    restaurant,
    foodItem,
    location,
    review,
} = require("../models");


const router = require("express").Router();

router.get("/:id", verify, async (req, res) => {
    const id = Number(req.params.id)
    try {
        const food = await foodItem.findAll({
            where: {
                id_restaurant: id,
            }
        })

        const restaurantData = await restaurant.findByPk(id,{

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

        res.status(200).json({
            restaurantData,
            food,

        }).end()

    } catch (err) {

        console.log(err);

        res
            .status(500)
            .json({
                message: err.message,
            })
            .end();

    }



});

router.get("/all/:id", verify, (req, res) => {
    const city = req.params.id
    restaurant.findAll({
            where: {
                city_name: city,
            }
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