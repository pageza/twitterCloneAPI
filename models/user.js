'use strict';
const {  Model } = require('sequelize');
const bcrypt = require('bcrypt')

function generateHash(user) {
  if(user == null) throw new Error('User not found')
  else if (!user.changed('password')) return user.password
  else {
    let salt = bcrypt.genSaltSync()
    return user.password = bcrypt.hashSync(user.password, salt)
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comment, Follow, Like }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts'})
      this.hasMany(Comment, { foreignKey: 'userId', as: 'comments'})
      this.hasMany(Like, {foreignKey: 'userId', as: 'likes'})
      this.belongsTo(Follow, { foreignKey: 'uuid', as: 'follower'})
      // this.hasMany(Follow, { foreignKey: 'followee_id', as: 'followee'})
    }
    toJSON(){
      return { ...this.get(), id: undefined, password: undefined }
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  User.beforeCreate(generateHash)
  User.beforeUpdate(generateHash)
  return User;
};
