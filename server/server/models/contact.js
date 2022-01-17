module.exports = (sequelize, DataTypes) => {
  var contact = sequelize.define('contact', {
    id: {
      type: DataTypes.UUID,
      defaultValue: function() {
        var uuidv4 = require('uuid/v4')
        return uuidv4()    
      },
      primaryKey: true
    },
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    position: DataTypes.STRING(100),
    phone: DataTypes.STRING(100),
    mobile: DataTypes.STRING(100),
    email: DataTypes.STRING(100)
  }, {});
  contact.associate = function(models) {
    contact.belongsTo(models.client, { 
      foreignKey: { 
        name: 'client_id', 
        allowNull: false 
      }
    });
    contact.belongsTo(models.tenant, { 
      foreignKey: { 
        name: 'tenant_id', 
        allowNull: false 
      } 
    });    
    // models.contact.hasMany(models.quoterequest);
}
  return contact;
};