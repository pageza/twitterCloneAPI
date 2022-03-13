'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('likes', {
      userId: {
        type: DataTypes.UUID
      },
      postId: {
        type: DataTypes.UUID
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
    await queryInterface.dropTable('likes');
  }
};
