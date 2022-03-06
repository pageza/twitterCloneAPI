'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment, Like }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user'})
      this.hasMany(Comment, { foreignKey: 'postId', as: 'comments'})
      this.hasMany(Like, { foreignKey: 'postId', as: 'likes'})
    }
    toJSON(){
      return { ...this.get(), id: undefined, userId: undefined, postId: undefined}
    }
  }
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { message: "A post requires a title"}
      }
    },
    postContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    postImage: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};
