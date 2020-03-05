
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('carts', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.TEXT,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    imageLink: {
      type: Sequelize.TEXT,
    },
    category: {
      type: Sequelize.TEXT,
    },
    total: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('carts'),
};
