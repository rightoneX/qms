module.exports = (sequelize, DataTypes) => {
  var group = sequelize.define('group', {
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
    name: DataTypes.STRING(50),
    description: DataTypes.STRING(200)
  }, {});
  group.associate = function(models) {
    group.belongsTo(models.role, { 
      foreignKey: { 
        name: 'role_id', 
        allowNull: false 
      } 
  });
  group.belongsTo(models.tenant, { 
    foreignKey: { 
      name: 'tenant_id', 
      allowNull: false 
    } 
  });
  // models.group.hasMany(models.user);
}
  return group;
};