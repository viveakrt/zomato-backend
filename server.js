const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require("./models");


const placeOrder = require('./routes/placeOrder');
const authRoute = require('./routes/authenticate');
const restaurants = require("./routes/restaurant")
const foodItem = require('./routes/foodItem');
const search = require('./routes/search')
const review = require("./routes/review")


dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const cors = require('cors');

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use("/user", authRoute);
app.use("/", restaurants);
app.use("/restaurant", foodItem);
app.use("/search", search);
app.use("/",placeOrder)
app.use("/",review)


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