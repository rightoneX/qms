module.exports = (sequelize, DataTypes) => {
  var quoteblock = sequelize.define('quoteblock', {
    id: {
      type: DataTypes.UUID,
      defaultValue: function() {
        var uuidv4 = require('uuid/v4')
        return uuidv4()    
      },
      primaryKey: true,
      onDelete: 'cascade'
    },
    name: DataTypes.STRING(50),
    description: DataTypes.STRING(200),
    note: DataTypes.STRING(200),
    cost: {
      type: DataTypes.STRING(13),
      defaultValue: '0.00'
    }
  }, {});
  quoteblock.associate = function(models) {
    quoteblock.belongsTo(models.tenant, { 
    foreignKey: { 
      name: 'tenant_id', 
      allowNull: false 
    }
   });
   quoteblock.belongsTo(models.user, { 
   foreignKey: { 
     name: 'user_id', 
     allowNull: false 
   }
  });
  // delete all price item belongs to this quote block
  quoteblock.hasMany(models.quotepricelist, {
    foreignKey: {
      name: 'quoteblock_id',
      allowNull: false,
      onDelete: 'cascade'
    }
  });
}
  return quoteblock;
};