module.exports = (sequelize, DataTypes) => {
  var quoterequeststatus = sequelize.define('quoterequeststatus', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(50)
    },
    description: DataTypes.STRING(200)
  }, {});
  quoterequeststatus.associate = function(models) { 
    // models.quoterequeststatus.hasMany(models.quoterequest);
  }
  return quoterequeststatus;
};