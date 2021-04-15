const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require("./models");
const authRoute = require('./routes/authenticate');
const restaurants = require("./routes/restaurant")
const foodItem = require('./routes/foodItem');
const cors = require('cors')

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use("/user", authRoute);
app.use("/", restaurants);
app.use("/restaurant",foodItem)



db.sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`PORT is ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });