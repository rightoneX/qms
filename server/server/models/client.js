/* The client compnaies who the tenenat dealing with. 
*  Buying or selling goods and services
*/
module.exports = (sequelize, DataTypes) => {
  var client = sequelize.define('client', {
    id: {
      type: DataTypes.UUID,
      defaultValue: function() {
        var uuidv4 = require('uuid/v4')
        return uuidv4()    
      },
      primaryKey: true
    },
    name:{
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    profile: DataTypes.STRING(500),
    email: DataTypes.STRING(100),
    phone: DataTypes.STRING(100),
    fax: DataTypes.STRING(100),
    url: DataTypes.STRING(100),
    logo: DataTypes.STRING(100),
    country: DataTypes.STRING(100),
    city: DataTypes.STRING(100),
    address: DataTypes.STRING(100),
    postbox: DataTypes.STRING(500)
  }, {});
  client.associate = function(models) {
    client.belongsTo(models.relation, { 
      foreignKey: { 
        name: 'relation_id', 
        allowNull: false 
      }
    });
    client.belongsTo(models.tenant, { 
      foreignKey: { 
        name: 'tenant_id', 
        allowNull: false 
      } 
    });
    // models.client.hasMany(models.product);
    // models.client.hasMany(models.pricelist);
    // models.client.hasMany(models.contact);
}
  return client;
}
