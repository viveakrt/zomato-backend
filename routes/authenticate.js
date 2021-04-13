const router = require("express").Router();
const bcrypt = require('bcrypt');

const {
    customer: User
} = require("../models");

const {
    isEmail
} = require("validator");

const jwt = require("jsonwebtoken");
const {
    access_token
} = require("../config");



router.post("/register", async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = {
        customer_name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    };

    if (
        !(
            isEmail(newUser.email) &&
            newUser.customer_name.length > 3
        )
    ) {
        res
            .status(400)
            .json({
                massage: "Use valid email Id and user using 4 or more characters without space",
            })
            .end();
        return;
    } else {
        //Checking if the user is already in the database
        const emailExist = await User.findOne({
            where: {
                email: newUser.email,
            },
        });
        if (emailExist !== null) {
            return res
                .status(400)
                .json({
                    message: `Email ${newUser.email} already exists`,
                })
                .end();
        } else {

            await User.create(newUser)
                .then((userData) => {
                    res
                        .status(201)
                        .json({
                            userData,
                        })
                        .end();
                })
                .catch((err) => {
                    console.log(err);

                    res.sendStatus(500).end();
                });
        }
    }

});


router.post("/login", async (req, res) => {

    let newUser;

    if (req.body.email) {
        newUser = {
            email: req.body.email,
            password: req.body.password,
        };
    } else {
        return res.sendStatus(401).end();
    }

    const userExists = await User.findOne({
        where: {
            email: newUser.email,
        },
    });


    if (userExists !== null) {

        const validPass = await bcrypt.compare(req.body.password, userExists.password);

        if (!validPass) {
            return res.status(400).json({
                    message: `INVALID PASSWORD`,
                })
                .end();
        } else {
            const token = jwt.sign({
                email: userExists.email
            }, access_token);
            res.header('auth-token', token).json({
                    "JWT token": token,
                })
                .end();
            return;
        }
    } else {
        res
            .status(400)
            .json({
                message: `${userExists} Register To login`,
            })
            .end();
    }
});


module.exports = router;