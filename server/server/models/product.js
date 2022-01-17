module.exports = (sequelize, DataTypes) => {
  var product = sequelize.define('product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: function() {
        var uuidv4 = require('uuid/v4')
        return uuidv4()    
      },
      primaryKey: true
    },
    name: DataTypes.STRING(50),
    barcode: DataTypes.STRING(50),
    description: DataTypes.STRING(200),
    picture: DataTypes.STRING(200),
    datasheet: DataTypes.STRING(50)
  }, {});
  product.associate = function(models) {
    product.belongsTo(models.tenant, { 
      foreignKey: { 
        name: 'tenant_id', 
        allowNull: false 
      }
    })
    product.belongsTo(models.producttype, { 
      foreignKey: { 
        name: 'producttype_id', 
        allowNull: false 
      }
    });
    product.belongsTo(models.client, { 
      foreignKey: { 
        name: 'client_id', 
        allowNull: false 
      }
    });
    // models.product.hasMany(models.pricelist);
}
  return product;
};