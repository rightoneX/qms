module.exports = (sequelize, DataTypes) => {
  var quoterequest = sequelize.define('quoterequest', {
    id: {
      type: DataTypes.UUID,
      defaultValue: function() {
        var uuidv4 = require('uuid/v4')
        return uuidv4()    
      },
      primaryKey: true
    },
    revision: DataTypes.STRING(12),
    description: DataTypes.STRING(200),    
    note: DataTypes.STRING(200),
    requestedby: DataTypes.DATEONLY
  }, {});
  quoterequest.associate = function(models) {
    quoterequest.belongsTo(models.quoterequeststatus, { 
      foreignKey: { 
        name: 'quoterequeststatus_id', 
        allowNull: false 
      }
    });
    quoterequest.belongsTo(models.quote, { 
      foreignKey: { 
        name: 'quote_id', 
        allowNull: false 
      }
    });
    quoterequest.belongsTo(models.contact, { 
      foreignKey: { 
        name: 'contact_id', 
        allowNull: false 
      }
    });
    quoterequest.belongsTo(models.client, { 
      foreignKey: { 
        name: 'client_id', 
        allowNull: false 
      }
    });
}
  return quoterequest;
};