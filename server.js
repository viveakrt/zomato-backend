const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require("./models");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());


db.sequelize
    .sync()
    .then((req) => {
        app.listen(PORT, () => {
            console.log(`PORT is ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
