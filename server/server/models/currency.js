module.exports = (sequelize, DataTypes) => {
  var currency = sequelize.define('currency', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING(3)
    },
    country: DataTypes.STRING(50)
  }, {});
  currency.associate = function(models) { 
    // models.currency.hasMany(models.pricelist);
  }
  return currency;
};