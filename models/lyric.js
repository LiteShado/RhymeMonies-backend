'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lyric extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.lyric.belongsTo(models.user, {foreignKey: 'userId'})
      models.lyric.belongsTo(models.song, {foreignKey: 'songId'})
    }
  };
  lyric.init({
    lyric: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER
    },
    songId: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'lyric',
  });
  return lyric;
};
