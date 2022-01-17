/* The table contains informaiton on the phisical location of the 
* goods in the storage area. Aisle, Section, Level
*/ 
module.exports = (sequelize, DataTypes) => {
  var stocklocation = sequelize.define('stocklocation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: function() {
        var uuidv4 = require('uuid/v4')
        return uuidv4()    
      },
      primaryKey: true
    },
    x: {
      allowNull: false,
      type: DataTypes.STRING(10)
    },
    y: {
      allowNull: false,
      type: DataTypes.STRING(10)
    },
    z: {
      allowNull: false,
      type: DataTypes.STRING(10)
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    description: DataTypes.STRING(500)
  }, {});
  stocklocation.associate = function(models) {
    stocklocation.belongsTo(models.tenant, { 
      foreignKey: { 
        name: 'tenant_id', 
        allowNull: false 
       } 
      });  
    // models.stocklocation.hasMany(models.stock);
    }
  return stocklocation;
};