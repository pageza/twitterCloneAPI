'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('follows', {
      follower_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      followee_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('follows');
  }
};
