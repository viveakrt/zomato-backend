module.exports = (sequelize, DataTypes) => {
    const customerHasLocation = sequelize.define("customerHasLocation", {

        id_customerHasLocation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        id_customer: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },

        id_location:{
            type : DataTypes.INTEGER,
            allowNull:false,
        }

        
    });
    return customerHasLocation;
};