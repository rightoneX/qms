module.exports = (sequelize, DataTypes) => {
  var tenant = sequelize.define('tenant', {
    // id: {
    //   allowNull: false,
    //   primaryKey: true,
    //   type: DataTypes.STRING(50)
    // }, 
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
    postbox: DataTypes.STRING(500),
    gst: DataTypes.STRING(20),
    quotecode: DataTypes.STRING(10),
    quotefirstnumber: DataTypes.INTEGER
  }, {});
  tenant.associate = function(models) {
    // models.tenant.hasMany(models.user);
    // models.tenant.hasMany(models.client);
    // models.tenant.hasMany(models.pricelist);
    // models.tenant.hasMany(models.role);    
    // models.tenant.hasMany(models.group);
    // models.tenant.hasMany(models.producttype);
    // models.tenant.hasMany(models.stock);
    // models.tenant.hasMany(models.stocklocation);
    // models.tenant.hasMany(models.quote);
  }
  return tenant;
}