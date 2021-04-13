const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    port : process.env.PORT,
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    host : process.env.DB_HOST,
    access_token: process.env.ACCESS_TOKEN_SECRET,
}