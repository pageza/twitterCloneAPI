'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {foreignKey: 'follower_id', as: 'follower'})
      this.belongsTo(User, {foreignKey: 'followee_id', as: 'followee'})
    }
  }
  Follow.init({
    follower_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    followee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'follows',
    modelName: 'Follow',
  });
  return Follow;
};
