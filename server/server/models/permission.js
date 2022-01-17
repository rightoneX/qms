module.exports = (sequelize, DataTypes) => {
  var permission = sequelize.define('permission', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(50)
    },
    name: DataTypes.STRING(50),
    description: DataTypes.STRING(200)
  }, {});
  permission.associate = function(models) {
    // models.permission.hasMany(models.user);
  }
  return permission;
};