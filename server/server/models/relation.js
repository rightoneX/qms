module.exports = (sequelize, DataTypes) => {
  var relation = sequelize.define('relation', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING(20)
    },
    code: DataTypes.INTEGER(2),
    description: DataTypes.STRING(50)
  }, {});
  relation.associate = function(models) {
    // models.relation.hasMany(models.client);
  }
  return relation;
};