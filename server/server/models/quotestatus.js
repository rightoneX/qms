module.exports = (sequelize, DataTypes) => {
  var quotestatus = sequelize.define('quotestatus', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING(20)
    },
    description: DataTypes.STRING(100)
  }, {});
  quotestatus.associate = function(models) { 
    // models.quotestatus.hasMany(models.quote);
  }
  return quotestatus;
};