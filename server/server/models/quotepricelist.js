module.exports = (sequelize, DataTypes) => {
  var quotepricelist = sequelize.define('quotepricelist', {
    id: {
      type: DataTypes.UUID,
      defaultValue: function() {
        var uuidv4 = require('uuid/v4')
        return uuidv4()    
      },
      primaryKey: true
    },
    brand: DataTypes.STRING(50),
    type: DataTypes.STRING(50),
    name: DataTypes.STRING(50),
    cost: DataTypes.DECIMAL(13, 2),
    qty: DataTypes.INTEGER(9),
    price: DataTypes.DECIMAL(13, 2),
    margin: DataTypes.DECIMAL(13),
    note: DataTypes.STRING(200)
  }, {});
  quotepricelist.associate = function(models) {  
    quotepricelist.belongsTo(models.pricelist, { 
      foreignKey: { 
        name: 'pricelist_id', 
        allowNull: false 
      }
    });
    quotepricelist.belongsTo(models.quoteblock, { 
      foreignKey: { 
        name: 'quoteblock_id', 
        allowNull: false 
      }
    });
    quotepricelist.belongsTo(models.tenant, { 
      foreignKey: { 
        name: 'tenant_id', 
        allowNull: false 
      }
    });
    quotepricelist.belongsTo(models.user, { 
      foreignKey: { 
        name: 'user_id', 
        allowNull: false 
      }
    });
}
  return quotepricelist;
};