import Api from '@/Services/Api'

export default {
  userLogin (params) {
    return Api().post('/user/login', params)
  },
  addUser (params) {
    return Api().post('/user', params)
  },
  fetchUser () {
    return Api().get('/user')
  },
  updateUser (params) {
    return Api().put('/user/' + params.id, params)
  },
  fetchUserById (params) {
    return Api().get('/user/' + params)
  },
  fetchUserByTenant (params) {
    return Api().get('/user/tenant/' + params)
  },

  fetchTenantById (params) {
    return Api().get('/tenant/' + params)
  },
  fetchTenantByEmail (params) {
    return Api().get('/tenant/email/' + params)
  },
  fetchTenant () {
    return Api().get('/tenant')
  },
  deleteTenant (id) {
    return Api().delete('/tenant/' + id)
  },
  addTenant (params) {
    return Api().post('/tenant', params)
  },
  updateTenant (params) {
    return Api().put('/tenant/' + params.id, params)
  },

  fetchProduct () {
    return Api().get('/product')
  },
  fetchProductById (params) {
    return Api().get('/product/' + params)
  },
  fetchProductByClient (params) {
    return Api().get('/product/client/' + params)
  },
  fetchProductByTenant (params) {
    return Api().get('/product/tenant/' + params)
  },
  fetchProductByTenantAndClient (params, client) {
    return Api().get('/product/tenant/' + params + '/client/' + client)
  },
  fetchProductByClientAndProducttype (client, producttype) {
    return Api().get('/product/client/' + client + '/producttype/' + producttype)
  },
  deleteProduct (id) {
    return Api().delete('/product/' + id)
  },
  addProduct (params) {
    return Api().post('/product', params)
  },
  updateProduct (params) {
    return Api().put('/product/' + params.id, params)
  },

  fetchRole () {
    return Api().get('/role')
  },
  fetchRoleById (params) {
    return Api().get('/role/' + params)
  },
  fetchRoleByTenant (params) {
    return Api().get('/role/tenant/' + params)
  },
  deleteRole (id) {
    return Api().delete('/role/' + id)
  },
  addRole (params) {
    return Api().post('/role', params)
  },
  updateRole (params) {
    return Api().put('/role/' + params.id, params)
  },

  fetchGroup () {
    return Api().get('/group')
  },
  fetchGroupById (params) {
    return Api().get('/group/' + params)
  },
  fetchGroupByTenant (params) {
    return Api().get('/group/tenant/' + params)
  },
  deleteGroup (id) {
    return Api().delete('/group/' + id)
  },
  addGroup (params) {
    return Api().post('/group', params)
  },
  updateGroup (params) {
    return Api().put('/group/' + params.id, params)
  },

  fetchPermission () {
    return Api().get('/permission')
  },
  fetchPermissionById (params) {
    return Api().get('/permission/' + params)
  },
  deletePermission (id) {
    return Api().delete('/permission/' + id)
  },
  addPermission (params) {
    return Api().post('/permission', params)
  },
  updatePermission (params) {
    return Api().put('/permission/' + params.id, params)
  },

  fetchProductType () {
    return Api().get('/producttype')
  },
  fetchProductTypeById (params) {
    return Api().get('/producttype/' + params)
  },
  fetchProductTypeByTenant (params) {
    return Api().get('/producttype/tenant/' + params)
  },
  fetchProductTypeByTenantAndName (params, name) {
    return Api().get('/producttype/tenant/' + params + /name/ + name)
  },
  deleteProductType (id) {
    return Api().delete('/producttype/' + id)
  },
  addProductType (params) {
    return Api().post('/producttype/', params)
  },
  updateProductType (params) {
    return Api().put('/producttype/' + params.id, params)
  },

  fetchStockLocation () {
    return Api().get('/stocklocation')
  },
  fetchStockLocationById (params) {
    return Api().get('/stocklocation/' + params)
  },
  fetchStockLocationByTenant (params) {
    return Api().get('/stocklocation/tenant/' + params)
  },
  deleteStockLocation (id) {
    return Api().delete('/stocklocation/' + id)
  },
  addStockLocation (params) {
    return Api().post('/stocklocation', params)
  },
  updateStockLocation (params) {
    return Api().put('/stocklocation/' + params.id, params)
  },

  fetchStockCondition () {
    return Api().get('/stockcondition')
  },
  fetchStockConditionById (params) {
    return Api().get('/stockcondition/' + params)
  },
  deleteStockCondition (id) {
    return Api().delete('/stockcondition/' + id)
  },
  addStockCondition (params) {
    return Api().post('/stockcondition', params)
  },
  updateStockCondition (params) {
    return Api().put('/stockcondition/' + params.id, params)
  },

  fetchStock () {
    return Api().get('/stock')
  },
  fetchStockById (params) {
    return Api().get('/stock/' + params)
  },
  fetchStockByTenant (params) {
    return Api().get('/stock/tenant/' + params)
  },
  fetchStockByClient (params) {
    return Api().get('/stock/client/' + params)
  },
  deleteStock (id) {
    return Api().delete('/stock/' + id)
  },
  addStock (params) {
    return Api().post('/stock', params)
  },
  updateStock (params) {
    return Api().put('/stock/' + params.id, params)
  },

  fetchClient () {
    return Api().get('/client')
  },
  fetchClientById (params) {
    return Api().get('/client/' + params)
  },
  fetchClientByTenant (params) {
    return Api().get('/client/tenant/' + params)
  },
  fetchClientByTenantAndName (params, relation) {
    return Api().get('/client/tenant/' + params + '/name/' + relation)
  },
  fetchClientByTenantAndRelation (params, relation) {
    return Api().get('/client/tenant/' + params + '/relation/' + relation)
  },
  deleteClient (id) {
    return Api().delete('/client/' + id)
  },
  addClient (params) {
    return Api().post('/client', params)
  },
  updateClient (params) {
    return Api().put('/client/' + params.id, params)
  },

  fetchContact () {
    return Api().get('/contact')
  },
  fetchContactById (params) {
    return Api().get('/contact/' + params)
  },
  fetchContactByClient (params) {
    return Api().get('/contact/client/' + params)
  },
  fetchContactByTenant (params) {
    return Api().get('/contact/tenant/' + params)
  },
  fetchContactByClientAndName (client, name, surname) {
    return Api().get('/contact/client/' + client + '/name/' + name + '/surname/' + surname)
  },
  deleteContact (id) {
    return Api().delete('/contact/' + id)
  },
  addContact (params) {
    return Api().post('/contact', params)
  },
  updateContact (params) {
    return Api().put('/contact/' + params.id, params)
  },

  fetchRelation () {
    return Api().get('/relation')
  },
  fetchRelationById (params) {
    return Api().get('/relation/' + params)
  },
  deleteRelation (id) {
    return Api().delete('/relation/' + id)
  },
  addRelation (params) {
    return Api().post('/relation', params)
  },
  updateRelation (params) {
    return Api().put('/relation/' + params.id, params)
  },

  fetchCurrency () {
    return Api().get('/currency')
  },
  fetchCurrencyById (params) {
    return Api().get('/currency/' + params)
  },
  deleteCurrency (id) {
    return Api().delete('/currency/' + id)
  },
  addCurrency (params) {
    return Api().post('/currency', params)
  },
  updateCurrency (params) {
    return Api().put('currency/' + params.id, params)
  },

  fetchStockStatus () {
    return Api().get('/stockstatus')
  },
  fetchStockStatusById (params) {
    return Api().get('/stockstatus/' + params)
  },
  deleteStockStatus (id) {
    return Api().delete('/stockstatus/' + id)
  },
  addStockStatus (params) {
    return Api().post('/stockstatus', params)
  },
  updateStockStatus (params) {
    return Api().put('stockstatus/' + params.id, params)
  },

  fetchPriceList () {
    return Api().get('/pricelist')
  },
  fetchPriceListById (params) {
    return Api().get('/pricelist/' + params)
  },
  fetchPriceListByProduct (params) {
    return Api().get('/pricelist/product/' + params)
  },
  fetchPriceListByClient (params) {
    return Api().get('/pricelist/client/' + params)
  },
  fetchPriceListByTenant (params) {
    return Api().get('/pricelist/tenant/' + params)
  },
  fetchPriceListByClientAndBrand (params, brand) {
    return Api().get('/pricelist/client/' + params + '/brand/' + brand)
  },
  fetchPriceListByClientAndBrandAndProductType (params, brand, producttype) {
    return Api().get('/pricelist/client/' + params + '/brand/' + brand + '/producttype/' + producttype)
  },
  fetchPriceListByClientAndBrandAndProductTypeAndProduct (params, brand, producttype, product) {
    return Api().get('/pricelist/client/' + params + '/brand/' + brand + '/producttype/' + producttype + '/product/' + product)
  },
  fetchPriceListByTenantAndClient (params, client) {
    return Api().get('/pricelist/tenant/' + params + '/client/' + client)
  },
  deletePriceList (id) {
    return Api().delete('/pricelist/' + id)
  },
  addPriceList (params) {
    return Api().post('/pricelist', params)
  },
  updatePriceList (params) {
    return Api().put('/pricelist/' + params.id, params)
  },

  deleteQuote (id) {
    return Api().delete('/quote/' + id)
  },
  addQuote (params) {
    return Api().post('/quote', params)
  },
  updateQuote (params) {
    return Api().put('/quote/' + params.id, params)
  },
  fetchQuoteByTenant (params) {
    return Api().get('/quote/tenant/' + params)
  },
  fetchQuoteByTenantAndNumber (params, number) {
    return Api().get('/quote/tenant/' + params + '/number/' + number)
  },
  fetchQuoteById (params) {
    return Api().get('/quote/' + params)
  },

  fetchQuoteRequest () {
    return Api().get('/quoterequest/')
  },
  updateQuoteRequest (params) {
    return Api().put('/quoterequest/' + params.id, params)
  },
  deleteQuoteRequest (id) {
    return Api().delete('/quoterequest/' + id)
  },
  addQuoteRequest (params) {
    return Api().post('/quoterequest/', params)
  },
  fetchQuoteRequestByQuote (params) {
    return Api().get('/quoterequest/quote/' + params)
  },

  fetchQuoteBlockById (params) {
    return Api().get('/quoteblock/' + params)
  },
  fetchQuoteBlock () {
    return Api().get('/quoteblock/')
  },

  fetchQuoteRequestStatus () {
    return Api().get('/quoterequeststatus/')
  },

  fetchQuoteStatus () {
    return Api().get('/quotestatus/')
  },
  fetchQuoteStatusById (params) {
    return Api().get('/quotestatus/' + params)
  },
  deleteQuoteStatus (id) {
    return Api().delete('/quotestatus/' + id)
  },
  addQuoteStatus (params) {
    return Api().post('/quotestatus', params)
  },
  updateQuoteStatus (params) {
    return Api().put('quotestatus/' + params.id, params)
  },

  fetchQuoteBlockListByQuote (params) {
    return Api().get('/quoteblocklist/quote/' + params)
  },
  deleteQuoteBlockList (id) {
    return Api().delete('/quoteblocklist/' + id)
  },
  addQuoteBlockList (params) {
    return Api().post('/quoteblocklist/', params)
  },

  fetchQuoteBlockByQuote (params) {
    return Api().get('/quoteblock/quote/' + params)
  },
  fetchQuoteBlockByTenant (params) {
    return Api().get('/quoteblock/tenant/' + params)
  },
  fetchQuoteBlockByUser (params) {
    return Api().get('/quoteblock/user/' + params)
  },
  fetchQuoteBlockByTenantAndUser (params, user) {
    return Api().get('/quoteblock/tenant/' + params + '/user/' + user)
  },
  deleteQuoteBlock (id) {
    return Api().delete('/quoteblock/' + id)
  },
  addQuoteBlock (params) {
    return Api().post('/quoteblock/', params)
  },
  updateQuoteBlock (params) {
    return Api().put('/quoteblock/' + params.id, params)
  },

  fetchQuotePriceListByQuoteBlock (params) {
    return Api().get('/quotepricelist/quoteblock/' + params)
  },
  fetchQuotePriceListById (params) {
    return Api().get('/quotepricelist/' + params)
  },
  deleteQuotePriceList (id) {
    return Api().delete('/quotepricelist/' + id)
  },
  addQuotePriceList (params) {
    return Api().post('/quotepricelist/', params)
  },
  updateQuotePriceList (params) {
    return Api().put('/quotepricelist/' + params.id, params)
  }

}
