
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    imageLink: DataTypes.TEXT,
    category: DataTypes.TEXT,
  }, {});
  products.associate = function (models) {
    // associations can be defined here
  };
  return products;
};
