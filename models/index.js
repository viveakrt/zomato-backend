const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config');
const db = {};

let sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _customer = require("./customer");
var _foodItem = require("./foodItem");
var _inOrder = require("./inOrder");
var _location = require("./location");
var _locationHasCustomer = require("./locationHasCustomer");
var _locationHasRestaurant = require("./locationHasRestaurant");
var _placeOrder = require("./placeOrder");
var _restaurant = require("./restaurant");
var _review = require("./review");

var category = _category(sequelize, DataTypes);
var customer = _customer(sequelize, DataTypes);
var foodItem = _foodItem(sequelize, DataTypes);
var inOrder = _inOrder(sequelize, DataTypes);
var location = _location(sequelize, DataTypes);
var locationHasCustomer = _locationHasCustomer(sequelize, DataTypes);
var locationHasRestaurant = _locationHasRestaurant(sequelize, DataTypes);
var placeOrder = _placeOrder(sequelize, DataTypes);
var restaurant = _restaurant(sequelize, DataTypes);
var review = _review(sequelize, DataTypes);

db.customer.belongsToMany(location, { as: 'id_location_locations', through: locationHasCustomer, foreignKey: "id_customer", otherKey: "id_location" });
db.location.belongsToMany(customer, { as: 'id_customer_customers', through: locationHasCustomer, foreignKey: "id_location", otherKey: "id_customer" });

db.location.belongsToMany(restaurant, { as: 'id_restaurant_restaurants', through: locationHasRestaurant, foreignKey: "Location_idLocation", otherKey: "id_restaurant" });
db.restaurant.belongsToMany(location, { as: 'Location_idLocation_locations', through: locationHasRestaurant, foreignKey: "id_restaurant", otherKey: "Location_idLocation" });

db.foodItem.belongsTo(category, { as: "id_category_category", foreignKey: "id_category"});
db.category.hasMany(foodItem, { as: "foodItems", foreignKey: "id_category"});

db.locationHasCustomer.belongsTo(customer, { as: "id_customer_customer", foreignKey: "id_customer"});
db.customer.hasMany(locationHasCustomer, { as: "locationHasCustomers", foreignKey: "id_customer"});

db.placeOrder.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
db.customer.hasMany(placeOrder, { as: "placeOrders", foreignKey: "customer_id"});

db.review.belongsTo(customer, { as: "id_customer_customer", foreignKey: "id_customer"});
db.customer.hasMany(review, { as: "reviews", foreignKey: "id_customer"});

db.inOrder.belongsTo(foodItem, { as: "Food_item", foreignKey: "Food_item_id"});
db.foodItem.hasMany(inOrder, { as: "inOrders", foreignKey: "Food_item_id"});

db.review.belongsTo(foodItem, { as: "item", foreignKey: "item_id"});
db.foodItem.hasMany(review, { as: "reviews", foreignKey: "item_id"});

db.locationHasCustomer.belongsTo(location, { as: "id_location_location", foreignKey: "id_location"});
db.location.hasMany(locationHasCustomer, { as: "locationHasCustomers", foreignKey: "id_location"});

db.locationHasRestaurant.belongsTo(location, { as: "Location_idLocation_location", foreignKey: "Location_idLocation"});
db.location.hasMany(locationHasRestaurant, { as: "locationHasRestaurants", foreignKey: "Location_idLocation"});

db.inOrder.belongsTo(placeOrder, { as: "PlaceOrder", foreignKey: "PlaceOrder_id"});
db.placeOrder.hasMany(inOrder, { as: "inOrders", foreignKey: "PlaceOrder_id"});

db.foodItem.belongsTo(restaurant, { as: "id_restaurant_restaurant", foreignKey: "id_restaurant"});
db.restaurant.hasMany(foodItem, { as: "foodItems", foreignKey: "id_restaurant"});

db.locationHasRestaurant.belongsTo(restaurant, { as: "id_restaurant_restaurant", foreignKey: "id_restaurant"});
db.restaurant.hasMany(locationHasRestaurant, { as: "locationHasRestaurants", foreignKey: "id_restaurant"});

db.placeOrder.belongsTo(restaurant, { as: "restaurant", foreignKey: "restaurant_id"});
db.restaurant.hasMany(placeOrder, { as: "placeOrders", foreignKey: "restaurant_id"});

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;