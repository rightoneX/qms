module.exports = (sequelize, DataTypes) => {
  var producttype = sequelize.define('producttype', {
    id: {
      type: DataTypes.UUID,
      defaultValue: function() {
        var uuidv4 = require('uuid/v4')
        return uuidv4()    
      },
      primaryKey: true
    },
    name: DataTypes.STRING(50),
    description: DataTypes.STRING(200)
  }, {});
  producttype.associate = function(models) {
    producttype.belongsTo(models.tenant, { 
      foreignKey: { 
        name: 'tenant_id', 
        allowNull: false 
      } 
  });
  // models.producttype.hasMany(models.product);
}
  return producttype;
};