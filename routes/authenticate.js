const router = require("express").Router();
const bcrypt = require('bcrypt');

const {
    customer: User
} = require("../models");

const {
    isEmail,
    isAlpha
} = require("validator");

const jwt = require("jsonwebtoken");
const {
    access_token
} = require("../config");



router.post("/register", async (req, res) => {
    if (!req.body.name || !req.body.password || !req.body.email) {
        res
            .status(400)
            .json({
                message: "Name , email or password Field can't be Empty",
            })
            .end();
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = {
            customer_name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        };

        if (
            !(isEmail(newUser.email))
        ) {
            res
                .status(400)
                .json({
                    message: "Use valid email Id",
                })
                .end();
            return;
        } else if (
            !(isAlpha(newUser.customer_name))
        ) {
            res
                .status(400)
                .json({
                    message: "Name required to be alphabet only",
                })
                .end();
            return;
        } else if (
            !(newUser.customer_name.length > 3)
        ) {
            res
                .status(400)
                .json({
                    message: "Name using 4 or more characters",
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
                        message: `${newUser.email} already exists`,
                    })
                    .end();
            } else {

                await User.create(newUser)
                    .then((userData) => {
                        const token = jwt.sign({
                            email: newUser.email
                        }, access_token);
                        res.header('auth-token', token).json({
                                "jwtToken": token,
                                "userData": userData
                            })
                            .status(201)
                            .end();
                    })
                    .catch((err) => {
                        console.log(err);

                        res.sendStatus(500).end();
                    });
            }
        }
    }

});


router.post("/login", async (req, res) => {

    if (!req.body.password || !req.body.email) {
        res
            .status(400)
            .json({
                message: "Email or password Field can't be Empty",
            })
            .end();

    } else {

        let newUser = {
            email: req.body.email,
            password: req.body.password,
        };
        if (
            !(isEmail(newUser.email))
        ) {
            res
                .status(400)
                .json({
                    message: "Use valid email Id",
                })
                .end();
            return;
        } else {

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
                            "jwtToken": token,
                            "userData": userExists
                        })
                        .end();
                    return;
                }
            } else {
                res
                    .status(400)
                    .json({
                        message: `User does not exists`,
                    })
                    .end();
            }
        }
    }


});


module.exports = router;