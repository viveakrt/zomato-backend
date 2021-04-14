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

function initModels(sequelize) {
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

  customer.belongsToMany(location, { as: 'id_location_locations', through: locationHasCustomer, foreignKey: "id_customer", otherKey: "id_location" });
  location.belongsToMany(customer, { as: 'id_customer_customers', through: locationHasCustomer, foreignKey: "id_location", otherKey: "id_customer" });
  location.belongsToMany(restaurant, { as: 'id_restaurant_restaurants', through: locationHasRestaurant, foreignKey: "Location_idLocation", otherKey: "id_restaurant" });
  restaurant.belongsToMany(location, { as: 'Location_idLocation_locations', through: locationHasRestaurant, foreignKey: "id_restaurant", otherKey: "Location_idLocation" });
  foodItem.belongsTo(category, { as: "id_category_category", foreignKey: "id_category"});
  category.hasMany(foodItem, { as: "foodItems", foreignKey: "id_category"});
  locationHasCustomer.belongsTo(customer, { as: "id_customer_customer", foreignKey: "id_customer"});
  customer.hasMany(locationHasCustomer, { as: "locationHasCustomers", foreignKey: "id_customer"});
  placeOrder.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(placeOrder, { as: "placeOrders", foreignKey: "customer_id"});
  review.belongsTo(customer, { as: "id_customer_customer", foreignKey: "id_customer"});
  customer.hasMany(review, { as: "reviews", foreignKey: "id_customer"});
  inOrder.belongsTo(foodItem, { as: "Food_item", foreignKey: "Food_item_id"});
  foodItem.hasMany(inOrder, { as: "inOrders", foreignKey: "Food_item_id"});
  review.belongsTo(foodItem, { as: "item", foreignKey: "item_id"});
  foodItem.hasMany(review, { as: "reviews", foreignKey: "item_id"});
  locationHasCustomer.belongsTo(location, { as: "id_location_location", foreignKey: "id_location"});
  location.hasMany(locationHasCustomer, { as: "locationHasCustomers", foreignKey: "id_location"});
  locationHasRestaurant.belongsTo(location, { as: "Location_idLocation_location", foreignKey: "Location_idLocation"});
  location.hasMany(locationHasRestaurant, { as: "locationHasRestaurants", foreignKey: "Location_idLocation"});
  inOrder.belongsTo(placeOrder, { as: "PlaceOrder", foreignKey: "PlaceOrder_id"});
  placeOrder.hasMany(inOrder, { as: "inOrders", foreignKey: "PlaceOrder_id"});
  foodItem.belongsTo(restaurant, { as: "id_restaurant_restaurant", foreignKey: "id_restaurant"});
  restaurant.hasMany(foodItem, { as: "foodItems", foreignKey: "id_restaurant"});
  locationHasRestaurant.belongsTo(restaurant, { as: "id_restaurant_restaurant", foreignKey: "id_restaurant"});
  restaurant.hasMany(locationHasRestaurant, { as: "locationHasRestaurants", foreignKey: "id_restaurant"});
  placeOrder.belongsTo(restaurant, { as: "restaurant", foreignKey: "restaurant_id"});
  restaurant.hasMany(placeOrder, { as: "placeOrders", foreignKey: "restaurant_id"});

  return {
    category,
    customer,
    foodItem,
    inOrder,
    location,
    locationHasCustomer,
    locationHasRestaurant,
    placeOrder,
    restaurant,
    review,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
