module.exports = (sequelize, DataTypes) => {
  var pricelist = sequelize.define('pricelist', {
    id: {
      type: DataTypes.UUID,
      defaultValue: function() {
        var uuidv4 = require('uuid/v4')
        return uuidv4()    
      },
      primaryKey: true
    },
    note: DataTypes.STRING(500),
    cost: DataTypes.STRING(50)
  }, {});
  pricelist.associate = function(models) {
    pricelist.belongsTo(models.product, { 
      foreignKey: { 
        name: 'product_id', 
        allowNull: false 
      } 
    });
    pricelist.belongsTo(models.currency, { 
      foreignKey: { 
        name: 'currency_id', 
        allowNull: false 
      } 
    });
    pricelist.belongsTo(models.tenant, { 
      foreignKey: { 
        name: 'tenant_id', 
        allowNull: false 
      } 
    });
    pricelist.belongsTo(models.client, { 
      foreignKey: { 
        name: 'client_id', 
        allowNull: false 
      } 
    });
    // models.pricelist.hasMany(models.stock);
    // models.pricelist.hasMany(models.quotepricelist);
}
  return pricelist;
};