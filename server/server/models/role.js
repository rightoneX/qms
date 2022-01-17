module.exports = (sequelize, DataTypes) => {
  var role = sequelize.define('role', {
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
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    description: DataTypes.STRING(500)
  }, {});
  role.associate = function(models) {
    role.belongsTo(models.tenant, { 
    foreignKey: { 
      name: 'tenant_id', 
      allowNull: false 
      } 
    });
    // models.role.hasMany(models.group);
  }
  return role;
};