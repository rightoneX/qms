const pricelist = require('../models').pricelist;
var models  = require('../models');

module.exports = {
 
  list(req, res) {
    return pricelist
      .findAll()
      .then(pricelist => res.status(200).send(pricelist))
      .catch(error => res.status(400).send(error));
  },

  pricelistById (req, res) {
    return pricelist
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(pricelist => {
        if (!pricelist) {
          return res.status(404).send({
            message: 'Price List Not Found'
          })
        } else {
          return res.status(200).send(pricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  pricelistByProduct (req, res) {
    return pricelist
      .findAll({
        where: {
          product_id: req.params.product_id
        }
      })
      .then(pricelist => {
        if (!pricelist) {
          return res.status(404).send({
            message: 'Price List Not Found'
          })
        } else {
          return res.status(200).send(pricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  pricelistByTenant (req, res) {
    return pricelist
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(pricelist => {
        if (!pricelist) {
          return res.status(404).send({
            message: 'Price List Not Found'
          })
        } else {
          return res.status(200).send(pricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  pricelistByClient (req, res) {
    return pricelist
      .findAll({ 
        where: {
          client_id: req.params.client_id 
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(pricelist => {
        if (!pricelist) {
          return res.status(404).send({
            message: 'Price List Not Found'
          })
        } else {
          return res.status(200).send(pricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  pricelistByClientAndBrand (req, res) {
    return pricelist
      .findAll({ 
        where: {
          client_id: req.params.client_id 
        },
        include: [{
          model: models.product, 
          where: { client_id: req.params.brand_id },
          include: [{
              all: true
          }]
        }]
      })
      .then(pricelist => {
        if (!pricelist) {
          return res.status(404).send({
            message: 'Price List Not Found'
          })
        } else {
          return res.status(200).send(pricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  pricelistByClientAndBrandAndProductType (req, res) {
    return pricelist
      .findAll({ 
        where: {
          client_id: req.params.client_id 
        },
        include: [{
          model: models.product, 
          where: { 
            client_id: req.params.brand_id,
            producttype_id: req.params.producttype_id
              },
              include: [{
                  all: true
              }]
        }]
      })
      .then(pricelist => {
        if (!pricelist) {
          return res.status(404).send({
            message: 'Price List Not Found'
          })
        } else {
          return res.status(200).send(pricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  pricelistByTenantAndClient (req, res) {
    return pricelist
      .findAll({
        where: {
          tenant_id: req.params.tenant_id,
          client_id: req.params.client_id
        }
      })
      .then(pricelist => {
        if (!pricelist) {
          return res.status(404).send({
            message: 'Price List Not Found'
          })
        } else {
          return res.status(200).send(pricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  pricelistByClientAndBrandAndProductTypeAndProduct (req, res) {
    return pricelist
      .findAll({ 
        where: {
          client_id: req.params.client_id 
        },
        include: [{
          model: models.product, 
          where: { 
            client_id: req.params.idbrand,
            producttype_id: req.params.producttype_id,
            product_id: req.params.product_id
           },
          include: [{
              all: true
          }]
        }]
      })
      .then(pricelist => {
        if (!pricelist) {
          return res.status(404).send({
            message: 'Price List Not Found'
          })
        } else {
          return res.status(200).send(pricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  pricelistByTenantAndClient (req, res) {
    return pricelist
      .findAll({
        where: {
          tenant_id: req.params.tenant_id,
          client_id: req.params.client_id
        }
      })
      .then(pricelist => {
        if (!pricelist) {
          return res.status(404).send({
            message: 'Price List Not Found'
          })
        } else {
          return res.status(200).send(pricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return pricelist
      .findById(req.params.id)
      .then(pricelist => {
        if (!pricelist) {
          return res.status(400).send({
            message: 'Price List Not Found',
          });
        }
        return pricelist
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    return pricelist
      .create({
        id: req.body.id,
        note: req.body.note,
        cost: req.body.cost,
        tenant_id: req.body.tenant_id,
        product_id: req.body.product_id,
        client_id: req.body.client_id,
        currency_id: req.body.currency_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      })
      .then(pricelist => res.status(201).send(pricelist))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return pricelist
      .findById(req.params.id)
      .then(pricelist => {
        if (!pricelist) {
          return res.status(404).send({
            message: 'Price List Not Found',
          });
        }
        return pricelist
          .update({
            note: req.body.note || pricelist.note,
            cost: req.body.cost || pricelist.cost,
            tenant_id: req.body.tenant_id || pricelist.tenant_id,
            product_id: req.body.product_id || pricelist.product_id,
            client_id: req.body.client_id || pricelist.client_id,
            currency_id: req.body.currency_id || pricelist.currency_id          
          })
          .then(() => res.status(200).send(pricelist))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};