module.exports = (sequelize, DataTypes) => {
  var quoteblocklist = sequelize.define('quoteblocklist', {
    id: {
      type: DataTypes.UUID,
      defaultValue: function() {
        var uuidv4 = require('uuid/v4')
        return uuidv4()    
      },
      primaryKey: true
    },
    cost: DataTypes.DECIMAL(13, 2),
    qty: DataTypes.INTEGER(9),
    margin: DataTypes.DECIMAL(13, 2),
    price: DataTypes.DECIMAL(13, 2)
  }, {});
  quoteblocklist.associate = function(models) {
    quoteblocklist.belongsTo(models.quote, { 
    foreignKey: { 
      name: 'quote_id', 
      allowNull: false 
    }
   });  
   quoteblocklist.belongsTo(models.quoteblock, { 
   foreignKey: { 
     name: 'quoteblock_id', 
     allowNull: false 
   }
  });    
  quoteblocklist.belongsTo(models.tenant, { 
  foreignKey: { 
    name: 'tenant_id', 
    allowNull: false 
  }
 }); 
}
  return quoteblocklist;
};