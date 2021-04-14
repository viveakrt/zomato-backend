const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('locationHasCustomer', {
    id_location: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'location',
        key: 'id_location'
      }
    },
    id_customer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'id_customer'
      }
    }
  }, {
    sequelize,
    tableName: 'locationHasCustomer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_location" },
          { name: "id_customer" },
        ]
      },
      {
        name: "fk_Location_has_Customer_Customer1_idx",
        using: "BTREE",
        fields: [
          { name: "id_customer" },
        ]
      },
      {
        name: "fk_Location_has_Customer_Location1_idx",
        using: "BTREE",
        fields: [
          { name: "id_location" },
        ]
      },
    ]
  });
};
