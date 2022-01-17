const producttype = require('../models').producttype

module.exports = {

  list (req, res) {
    return producttype
      .all()
      .then(producttype => res.status(200).send(producttype))
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return producttype
      .findById(req.params.id)
      .then(producttype => {
        if (!producttype) {
          return res.status(400).send({
            message: 'Product Type Not Found'
          })
        }
        return producttype
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return producttype
      .create({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        tenant_id: req.body.tenant_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(producttype => res.status(201).send(producttype))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return producttype
      .findById(req.params.id)
      .then(producttype => {
        if (!producttype) {
          return res.status(404).send({
            message: 'Product Type Not Found'
          })
        }
        return producttype
          .update({
            name: req.body.name || producttype.name,  
            description: req.body.description || producttype.description
          })
          .then(() => res.status(200).send(producttype))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  producttypeByTenant (req, res) {
    return producttype
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        }
      })
      .then(producttype => {
        if (!producttype) {
          return res.status(404).send({
            message: 'Product Type Item Not Found'
          })
        } else {
          return res.status(200).send(producttype)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  producttypeByTenantAndName (req, res) {
    return producttype
      .findAll({
        where: {
          tenant_id: req.params.tenant_id,
          name: req.params.name
        }
      })
      .then(producttype => {
        if (!producttype) {
          return res.status(404).send({
            message: 'Product Type Item Not Found'
          })
        } else {
          return res.status(200).send(producttype)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  producttypeById (req, res) {
    return producttype
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(producttype => {
        if (!producttype) {
          return res.status(404).send({
            message: 'Product Type Item Not Found'
          })
        } else {
          return res.status(200).send(producttype)
        }
      })
      .catch(error => res.status(400).send(error))
  }

}
