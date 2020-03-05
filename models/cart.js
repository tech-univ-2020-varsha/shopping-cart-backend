
module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define('cart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    imageLink: DataTypes.TEXT,
    total: DataTypes.INTEGER,
    category: DataTypes.TEXT,

  }, {});
  cart.associate = function (models) {
    // associations can be defined here
  };
  return cart;
};
