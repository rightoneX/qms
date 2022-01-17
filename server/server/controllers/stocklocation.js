const stocklocation = require('../models').stocklocation

module.exports = {

  list (req, res) {
    return stocklocation
      .all()
      .then(stocklocation => res.status(200).send(stocklocation))
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return stocklocation
      .findById(req.params.id)
      .then(stocklocation => {
        if (!stocklocation) {
          return res.status(400).send({
            message: 'Stock location Not Found'
          })
        }
        return stocklocation
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return stocklocation
      .create({        
        id: req.body.id,
        x: req.body.x,
        y: req.body.y,
        z: req.body.z,
        name: req.body.name,
        description: req.body.description,
        tenant_id: req.body.tenant_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(stocklocation => res.status(201).send(stocklocation))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return stocklocation
      .findById(req.params.id)
      .then(stocklocation => {
        if (!stocklocation) {
          return res.status(404).send({
            message: 'Stock location Not Found'
          })
        }
        return stocklocation
          .update({
            x: req.body.x || stocklocation.x,
            y: req.body.y || stocklocation.y,
            z: req.body.z || stocklocation.z,
            name: req.body.name || stocklocation.name,
            description: req.body.description || stocklocation.description
          })
          .then(() => res.status(200).send(stocklocation))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  stocklocationByTenant (req, res) {
    return stocklocation
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        }
      })
      .then(stocklocation => {
        if (!stocklocation) {
          return res.status(404).send({
            message: 'Stock location Not Found'
          })
        } else {
          return res.status(200).send(stocklocation)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  stocklocationById (req, res) {
    return stocklocation
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(stocklocation => {
        if (!stocklocation) {
          return res.status(404).send({
            message: 'Stock location Not Found'
          })
        } else {
          return res.status(200).send(stocklocation)
        }
      })
      .catch(error => res.status(400).send(error))
  }
}
