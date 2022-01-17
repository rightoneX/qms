module.exports = (sequelize, DataTypes) => {
  var quote = sequelize.define('quote', {
    id: {
      type: DataTypes.UUID,
      defaultValue: function() {
        var uuidv4 = require('uuid/v4')
        return uuidv4()    
      },
      primaryKey: true
    },
    number: {
      type: DataTypes.STRING(50)
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    totalprice: { 
      type: DataTypes.DECIMAL(13, 2),
      allowNull: true
    },
    address: DataTypes.STRING(200),
    revision: DataTypes.STRING(12),
    description: DataTypes.STRING(500),
    workscope: DataTypes.TEXT
  }, {}); 
  quote.associate = function(models) {
    quote.belongsTo(models.tenant, { 
      foreignKey: { 
        name: 'tenant_id', 
        allowNull: false 
      }
    });
    // models.quote.hasMany(models.quoterequest);
    // models.quote.hasMany(models.quoteblock);
    quote.belongsTo(models.user, { 
      foreignKey: { 
        name: 'user_id', 
        allowNull: false 
      }
    });
    quote.belongsTo(models.quotestatus, { 
      foreignKey: { 
        name: 'quotestatus_id', 
        allowNull: false 
      }
    });
}
  return quote;
};