module.exports = (sequelize, DataTypes) => {
    const location = sequelize.define("location", {

        id_location: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,

        }

        
    });

    return location;
};