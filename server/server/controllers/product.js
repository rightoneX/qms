const product = require('../models').product;
var models  = require('../models');

module.exports = {
 
  list(req, res) {
    return product
      .findAll()
      .then(product => res.status(200).send(product))
      .catch(error => res.status(400).send(error));
  },

  productById (req, res) {
    return product
      .findOne({
        where: {
          id: req.params.id
        },
        include: [ 
          models.producttype,
          models.client
      ]
      })
      .then(product => {
        if (!product) {
          return res.status(404).send({
            message: 'Product Not Found'
          })
        } else {
          return res.status(200).send(product)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  productByTenant (req, res) {
    return product
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        },
        include: [
          models.client,
          models.producttype
        ]
      })
      .then(product => {
        if (!product) {
          return res.status(404).send({
            message: 'Product Not Found'
          })
        } else {
          return res.status(200).send(product)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  productByClient (req, res) {
    return product
      .findAll({
        where: {
          client_id: req.params.client_id
        },
        include: [
          models.producttype
        ]
      })
      .then(product => {
        if (!product) {
          return res.status(404).send({
            message: 'Product Not Found'
          })
        } else {
          return res.status(200).send(product)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  productByTenantAndClient (req, res) {
    return product
      .findAll({
        where: {
          tenant_id: req.params.tenant_id,
          client_id: req.params.client_id
        }
      })
      .then(product => {
        if (!product) {
          return res.status(404).send({
            message: 'Product Not Found'
          })
        } else {
          return res.status(200).send(product)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  
  productByTenantAndBarcode (req, res) {
    return product
      .findAll({
        where: {
          tenant_id: req.params.tenant_id,
          barcode: req.params.barcode
        }
      })
      .then(product => {
        if (!product) {
          return res.status(404).send({
            message: 'Product Not Found'
          })
        } else {
          return res.status(200).send(product)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  productByClientAndProducttype (req, res) {
    return product
      .findAll({
        where: {
          client_id: req.params.client_id,
          producttype_id: req.params.producttype_id
        }
      })
      .then(product => {
        if (!product) {
          return res.status(404).send({
            message: 'Product Not Found'
          })
        } else {
          return res.status(200).send(product)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return product
      .findById(req.params.id)
      .then(product => {
        if (!product) {
          return res.status(400).send({
            message: 'Product Not Found',
          });
        }
        return product
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    return product
      .create({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        picture: req.body.picture,
        datasheet: req.body.datasheet,
        barcode: req.body.barcode,
        tenant_id: req.body.tenant_id,
        producttype_id: req.body.producttype_id,
        client_id: req.body.client_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      })
      .then(product => res.status(201).send(product))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return product
      .findById(req.params.id)
      .then(product => {
        if (!product) {
          return res.status(404).send({
            message: 'Product Not Found',
          });
        }
        return product
          .update({
            name: req.body.name || product.name,
            description: req.body.description || product.description,
            picture: req.body.picture || product.picture,
            datasheet: req.body.datasheet || product.datasheet,
            barcode: req.body.barcode || product.barcode,
            tenant_id: req.body.tenant_id || product.tenant_id,
            producttype_id: req.body.producttype_id || product.producttype_id,
            client_id: req.body.client_id || product.client_id
          })
          .then(() => res.status(200).send(product))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};