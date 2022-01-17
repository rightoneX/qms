const tenant = require('./tenant')
const group = require('./group')
const permission = require('./permission')
const producttype = require('./producttype')
const role = require('./role')
const user = require('./user')
const product = require('./product')
const currency = require('./currency')
const stockstatus = require('./stockstatus')
const stockcondition = require('./stockcondition')
const stocklocation = require('./stocklocation')
const stock = require('./stock')
const pricelist = require('./pricelist')
const relation = require('./relation')
const client = require('./client')
const contact = require('./contact')
const quote = require('./quote')
const quoterequest = require('./quoterequest')
const quotestatus = require('./quotestatus')
const quotepricelist = require('./quotepricelist')
const quoteblock = require('./quoteblock')
const quoteblocklist = require('./quoteblocklist')
const quoterequeststatus = require('./quoterequeststatus')

module.exports = {
  tenant, 
  group,  
  permission,
  producttype,
  role,
  user,
  product,
  currency,
  stockstatus,
  stockcondition,
  stocklocation,
  stock,
  pricelist,
  relation,
  client,
  contact,
  quote,
  quotestatus,
  quotepricelist,
  quoteblock,
  quoteblocklist,
  quoterequest,
  quoterequeststatus
}
