const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('foodItem', {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    item_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id_category'
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    is_veg: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    id_restaurant: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurant',
        key: 'id_restaurant'
      }
    },
    item_image: {
      type: DataTypes.STRING(1000),
      allowNull:false,
    }
  }, {
    sequelize,
    tableName: 'foodItem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "fk_MenuItem_Category1_idx",
        using: "BTREE",
        fields: [
          { name: "id_category" },
        ]
      },
      {
        name: "fk_FoodItem_Restaurant1_idx",
        using: "BTREE",
        fields: [
          { name: "id_restaurant" },
        ]
      },
    ]
  });
};
