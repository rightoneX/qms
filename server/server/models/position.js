module.exports = (sequelize, DataTypes) => {
  var position = sequelize.define('position', {
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
  return position;
};