const { username } = require("../config");

module.exports = (sequelize, DataTypes) => {
    const customer = sequelize.define("customer", {

        id_customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        address: {
            type: DataTypes.STRING,
        },

        phone_number: {
            type: DataTypes.STRING,
            unique: true,
        },

        profile_image: {
            type: DataTypes.BLOB('long'),
        }

    });

    customer.associate = models => {
        customer.hasMany(models.customerHasLocation,{
            onDelete:"cascade"
        });
        
    }

    return customer;
};