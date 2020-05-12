'use strict';
module.exports = (sequelize, DataTypes) => {
  var unempcount = sequelize.define('unempcount', {
    agegroup: DataTypes.STRING,
    gender: DataTypes.STRING,
    country: DataTypes.STRING,
    data: DataTypes.JSON
  }, {});
  unempcount.associate = function(models) {
    // associations can be defined here
  };
  return unempcount;
};