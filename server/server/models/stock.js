module.exports = (sequelize, DataTypes) => {
  var stock = sequelize.define('stock', {
    id: {
      type: DataTypes.UUID,
      defaultValue: function() {
        var uuidv4 = require('uuid/v4')
        return uuidv4()    
      },
      primaryKey: true
    },
    sn: DataTypes.STRING(50),
    note: DataTypes.STRING(500),
    stockin: DataTypes.STRING(10),
    stockout: DataTypes.STRING(10)
  }, {});
  stock.associate = function(models) {
    stock.belongsTo(models.pricelist, { 
      foreignKey: { 
        name: 'pricelist_id', 
        allowNull: false 
      } 
    });
    stock.belongsTo(models.stockstatus, { 
      foreignKey: { 
        name: 'stockstatus_id', 
        allowNull: false 
      } 
    });
    stock.belongsTo(models.stockcondition, { 
      foreignKey: { 
        name: 'stockcondition_id', 
        allowNull: false 
      } 
    });
    stock.belongsTo(models.stocklocation, { 
      foreignKey: { 
        name: 'stocklocation_id', 
        allowNull: false 
      } 
    });
    stock.belongsTo(models.tenant, { 
      foreignKey: { 
        name: 'tenant_id', 
        allowNull: false 
      } 
    });
}
  return stock;
};