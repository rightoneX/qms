module.exports = (sequelize, DataTypes) => {
  var stockcondition = sequelize.define('stockcondition', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING(20)
    },
    description: DataTypes.STRING(500)
  }, {});
  stockcondition.associate = function(models) { 
    // models.stockcondition.hasMany(models.stock);
  }
  return stockcondition;
};