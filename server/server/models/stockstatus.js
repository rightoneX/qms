module.exports = (sequelize, DataTypes) => {
  var stockstatus = sequelize.define('stockstatus', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING(20)
    },
    description: DataTypes.STRING(500)
  }, {});
  stockstatus.associate = function(models) { 
    // models.stockstatus.hasMany(models.stock);
  }
  return stockstatus;
};