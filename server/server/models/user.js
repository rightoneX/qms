module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
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
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    position: DataTypes.STRING(100),
    phone: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    password: DataTypes.STRING(100)
  }, {});
  user.associate = function(models) {
    user.belongsTo(models.group, { 
      foreignKey: { 
        name: 'group_id', 
        allowNull: false 
      }
    });
    user.belongsTo(models.permission, { 
      foreignKey: { 
        name: 'permission_id', 
        allowNull: false 
      }
    })
    user.belongsTo(models.tenant, { 
      foreignKey: { 
        name: 'tenant_id', 
        allowNull: false 
      } 
    });
    
    // models.user.hasMany(models.quote);
}
  return user;
};
