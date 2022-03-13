'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      // define association here
      this.belongsTo(Post, { foreignKey: 'postId', as: 'post' })
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    }
  }
  Like.init({
    userId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    postId: {
      type: DataTypes.UUID,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'likes',
    modelName: 'Like',
  });
  return Like;
};
