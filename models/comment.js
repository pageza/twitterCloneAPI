'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, User}) {
      // define association here
      this.belongsTo(Post, {foreignKey: 'postId', as: 'post'})
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'})
    }
    toJSON(){
      return { ...this.get(), id: undefined, userId: undefined, postId: undefined}
    }
  }
  Comment.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    commentContent: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'Comment',
  });
  return Comment;
};
