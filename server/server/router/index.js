const tenantController = require('../controllers').tenant;
const userController = require('../controllers').user;
const productController = require('../controllers').product;
const roleController = require('../controllers').role;
const groupController = require('../controllers').group;
const permissionController = require('../controllers').permission;
const producttypeController = require('../controllers').producttype;
const currencyController = require('../controllers').currency;
const stockstatusController = require('../controllers').stockstatus;
const stockconditionController = require('../controllers').stockcondition;
const stocklocationController = require('../controllers').stocklocation;
const stockController = require('../controllers').stock;
const relationController = require('../controllers').relation;
const clientController = require('../controllers').client;
const contactController = require('../controllers').contact;
const pricelistController = require('../controllers').pricelist;
const quoteController = require('../controllers').quote;
const quoterequestController = require('../controllers').quoterequest;
const quoterequeststatusController = require('../controllers').quoterequeststatus;
const quotestatusController = require('../controllers').quotestatus;
const quoteblocklistController = require('../controllers').quoteblocklist;
const quoteblockController = require('../controllers').quoteblock;
const quotepricelistController = require('../controllers').quotepricelist;
// const quotestatusController = require('../controllers').quotestatus;

module.exports = (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome ... QMS API'
  }));

  app.get('/api/user', userController.list);
  app.get('/api/user/:id', userController.userById);
  app.get('/api/user/tenant/:tenant_id', userController.userByTenant);
  app.post('/api/user/login', userController.userLogin);
  app.post('/api/user/', userController.create);
  app.put('/api/user/:id', userController.update);

  app.get('/api/tenant', tenantController.list);
  app.get('/api/tenant/email/:email', tenantController.tenantByEmail);
  app.get('/api/tenant/:id', tenantController.tenantById);
  app.delete('/api/tenant/:id', tenantController.destroy);
  app.post('/api/tenant/', tenantController.create);
  app.put('/api/tenant/:id', tenantController.update);
  
  app.get('/api/product', productController.list);
  app.get('/api/product/:id', productController.productById);
  app.get('/api/product/tenant/:tenant_id', productController.productByTenant);
  app.get('/api/product/client/:client_id', productController.productByClient);
  app.get('/api/product/tenant/:tenant_id/client/:client_id', productController.productByTenantAndClient);  
  app.get('/api/product/tenant/:tenant_id/barcode/:barcode', productController.productByTenantAndBarcode);  
  app.get('/api/product/client/:client_id/producttype/:producttype_id', productController.productByClientAndProducttype);
  app.delete('/api/product/:id', productController.destroy);
  app.post('/api/product/', productController.create);
  app.put('/api/product/:id', productController.update);

  app.get('/api/role', roleController.list);
  app.get('/api/role/:id', roleController.roleById);
  app.get('/api/role/tenant/:tenant_id', roleController.roleByTenant);
  app.delete('/api/role/:id', roleController.destroy);
  app.post('/api/role/', roleController.create);
  app.put('/api/role/:id', roleController.update);
  
  app.get('/api/group', groupController.list);
  app.get('/api/group/:id', groupController.groupById);
  app.get('/api/group/tenant/:tenant_id', groupController.groupByTenant);
  app.delete('/api/group/:id', groupController.destroy);
  app.post('/api/group/', groupController.create);
  app.put('/api/group/:id', groupController.update);
  
  app.get('/api/permission', permissionController.list);
  app.get('/api/permission/:id', permissionController.permissionById);
  app.delete('/api/permission/:id', permissionController.destroy);
  app.post('/api/permission/', permissionController.create);
  app.put('/api/permission/:id', permissionController.update);

  app.get('/api/producttype', producttypeController.list);
  app.get('/api/producttype/:id', producttypeController.producttypeById);
  app.get('/api/producttype/tenant/:tenant_id', producttypeController.producttypeByTenant);
  app.get('/api/producttype/tenant/:tenant_id/name/:name', producttypeController.producttypeByTenantAndName);
  app.delete('/api/producttype/:id', producttypeController.destroy);
  app.post('/api/producttype/', producttypeController.create);
  app.put('/api/producttype/:id', producttypeController.update);
    
  app.get('/api/currency', currencyController.list);
  app.get('/api/currency/:id', currencyController.currencyById);
  app.delete('/api/currency/:id', currencyController.destroy);
  app.post('/api/currency/', currencyController.create);
  app.put('/api/currency/:id', currencyController.update);
      
  app.get('/api/stockstatus', stockstatusController.list);
  app.get('/api/stockstatus/:id', stockstatusController.stockstatusById);
  app.delete('/api/stockstatus/:id', stockstatusController.destroy);
  app.post('/api/stockstatus/', stockstatusController.create);
  app.put('/api/stockstatus/:id', stockstatusController.update);
    
  app.get('/api/stockcondition', stockconditionController.list);
  app.get('/api/stockcondition/:id', stockconditionController.stockconditionById);
  app.delete('/api/stockcondition/:id', stockconditionController.destroy);
  app.post('/api/stockcondition/', stockconditionController.create);
  app.put('/api/stockcondition/:id', stockconditionController.update);

  app.get('/api/stocklocation', stocklocationController.list);
  app.get('/api/stocklocation/:id', stocklocationController.stocklocationById);
  app.get('/api/stocklocation/tenant/:tenant_id', stocklocationController.stocklocationByTenant);
  app.delete('/api/stocklocation/:id', stocklocationController.destroy);
  app.post('/api/stocklocation/', stocklocationController.create);
  app.put('/api/stocklocation/:id', stocklocationController.update);

  app.get('/api/stock', stockController.list);
  app.get('/api/stock/:id', stockController.stockById);
  app.get('/api/stock/tenant/:tenant_id', stockController.stockByTenant);
  app.delete('/api/stock/:id', stockController.destroy);
  app.post('/api/stock/', stockController.create);
  app.put('/api/stock/:id', stockController.update);
  
  app.get('/api/relation', relationController.list);
  app.get('/api/relation/:id', relationController.relationById);
  app.delete('/api/relation/:id', relationController.destroy);
  app.post('/api/relation/', relationController.create);
  app.put('/api/relation/:id', relationController.update);
  
  app.get('/api/client', clientController.list);
  app.get('/api/client/tenant/:tenant_id', clientController.clientByTenant);
  app.get('/api/client/tenant/:tenant_id/name/:name', clientController.clientByTenantAndName);
  app.get('/api/client/tenant/:tenant_id/relation/:relation_id', clientController.clientByTenantAndRelation);
  app.get('/api/client/:id', clientController.clientById);
  app.delete('/api/client/:id', clientController.destroy);
  app.post('/api/client/', clientController.create);
  app.put('/api/client/:id', clientController.update);
    
  app.get('/api/contact', contactController.list);
  app.get('/api/contact/tenant/:tenant_id', contactController.contactByTenant);
  app.get('/api/contact/client/:client_id', contactController.contactByClient);
  app.get('/api/contact/client/:client_id/name/:firstName/surname/:lastName', contactController.contactByClientAndName);
  app.get('/api/contact/:id', contactController.contactById);
  app.delete('/api/contact/:id', contactController.destroy);
  app.post('/api/contact/', contactController.create);
  app.put('/api/contact/:id', contactController.update);
      
  app.get('/api/pricelist', pricelistController.list);
  app.get('/api/pricelist/client/:client_id', pricelistController.pricelistByClient);
  app.get('/api/pricelist/product/:product_id', pricelistController.pricelistByProduct);
  app.get('/api/pricelist/tenant/:tenant_id', pricelistController.pricelistByTenant);
  app.get('/api/pricelist/tenant/:tenant_id/client/:client_id', pricelistController.pricelistByTenantAndClient);
  app.get('/api/pricelist/client/:client_id/brand/:brand_id', pricelistController.pricelistByClientAndBrand);
  app.get('/api/pricelist/client/:client_id/brand/:brand_id/producttype/:producttype_id', pricelistController.pricelistByClientAndBrandAndProductType);
  app.get('/api/pricelist/client/:client_id/brand/:brand_id/producttype/:producttype_id/product/:product_id', pricelistController.pricelistByClientAndBrandAndProductTypeAndProduct);
  app.get('/api/pricelist/:id', pricelistController.pricelistById);
  app.delete('/api/pricelist/:id', pricelistController.destroy);
  app.post('/api/pricelist/', pricelistController.create);
  app.put('/api/pricelist/:id', pricelistController.update);
         
  app.get('/api/quote/', quoteController.list);
  app.get('/api/quote/:id', quoteController.quoteById);
  app.get('/api/quote/tenant/:tenant_id', quoteController.quoteByTenant);
  app.get('/api/quote/tenant/:tenant_id/number/:number', quoteController.quoteByTenantAndNumber);
  app.get('/api/quote/user/:user_id', quoteController.quoteByUser);
  app.delete('/api/quote/:id', quoteController.destroy);
  app.post('/api/quote/', quoteController.create);
  app.put('/api/quote/:id', quoteController.update);

  app.get('/api/quoterequest/', quoterequestController.list);
  app.get('/api/quoterequest/:id', quoterequestController.quoterequestById);
  app.get('/api/quoterequest/quote/:quote_id', quoterequestController.quoterequestByQuote);
  app.delete('/api/quoterequest/:id', quoterequestController.destroy);
  app.post('/api/quoterequest/', quoterequestController.create);
  app.put('/api/quoterequest/:id', quoterequestController.update);

  app.get('/api/quotestatus', quotestatusController.list);
  app.get('/api/quotestatus/:id', quotestatusController.quotestatusById);
  app.delete('/api/quotestatus/:id', quotestatusController.destroy);
  app.post('/api/quotestatus/', quotestatusController.create);
  app.put('/api/quotestatus/:id', quotestatusController.update);
  
  app.get('/api/quoterequeststatus', quoterequeststatusController.list);
  app.get('/api/quoterequeststatus/:id', quoterequeststatusController.quoterequeststatusById);
  app.delete('/api/quoterequeststatus/:id', quoterequeststatusController.destroy);
  app.post('/api/quoterequeststatus/', quoterequeststatusController.create);
  app.put('/api/quoterequeststatus/:id', quoterequeststatusController.update);

  app.get('/api/quoteblocklist', quoteblocklistController.list);
  app.get('/api/quoteblocklist/:id', quoteblocklistController.quoteblocklistById);
  app.get('/api/quoteblocklist/quote/:quote_id', quoteblocklistController.quoteblocklistByQuote);
  app.get('/api/quoteblocklist/tenant/:tenant_id', quoteblocklistController.quoteblocklistByTenant);
  app.delete('/api/quoteblocklist/:id', quoteblocklistController.destroy);
  app.post('/api/quoteblocklist/', quoteblocklistController.create);
  app.put('/api/quoteblocklist/:id', quoteblocklistController.update);

  app.get('/api/quoteblock/', quoteblockController.list);
  app.get('/api/quoteblock/:id', quoteblockController.quoteblockById);
  app.get('/api/quoteblock/pricelist/:pricelist_id', quoteblockController.quoteblockByPriceList);
  app.get('/api/quoteblock/tenant/:tenant_id', quoteblockController.quoteblockByTenant);
  app.get('/api/quoteblock/user/:user_id', quoteblockController.quoteblockByUser);
  app.delete('/api/quoteblock/:id', quoteblockController.destroy);
  app.post('/api/quoteblock/', quoteblockController.create);
  app.put('/api/quoteblock/:id', quoteblockController.update);

  app.get('/api/quotepricelist/', quotepricelistController.list);
  app.get('/api/quotepricelist/:id', quotepricelistController.quotepricelistById);
  app.get('/api/quotepricelist/pricelist/:pricelist_id', quotepricelistController.quotepricelistByPriceList);
  app.get('/api/quotepricelist/quoteblock/:quoteblock_id', quotepricelistController.quotepricelistByQuoteBlock);
  app.get('/api/quotepricelist/user/:user_id', quotepricelistController.quotepricelistByUser);
  app.get('/api/quotepricelist/tenant/:tenant_id', quotepricelistController.quotepricelistByTenant);
  app.delete('/api/quotepricelist/:id', quotepricelistController.destroy);
  app.post('/api/quotepricelist/', quotepricelistController.create);
  app.put('/api/quotepricelist/:id', quotepricelistController.update);
};
