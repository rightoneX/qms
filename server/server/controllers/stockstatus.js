const stockstatus = require('../models').stockstatus

module.exports = {

  list (req, res) {
    return stockstatus
      .all()
      .then(stockstatus => res.status(200).send(stockstatus))
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return stockstatus
      .findById(req.params.id)
      .then(stockstatus => {
        if (!stockstatus) {
          return res.status(400).send({
            message: 'Stock Status Not Found'
          })
        }
        return stockstatus
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return stockstatus
      .create({
        id: req.body.id,
        description: req.body.description,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(stockstatus => res.status(201).send(stockstatus))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return stockstatus
      .findById(req.params.id)
      .then(stockstatus => {
        if (!stockstatus) {
          return res.status(404).send({
            message: 'Stock Status Not Found'
          })
        }
        return stockstatus
          .update({
            description: req.body.description || stockstatus.description
          })
          .then(() => res.status(200).send(stockstatus))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  stockstatusById (req, res) {
    return stockstatus
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(stockstatus => {
        if (!stockstatus) {
          return res.status(404).send({
            message: 'Stock Status Not Found'
          })
        } else {
          return res.status(200).send(stockstatus)
        }
      })
      .catch(error => res.status(400).send(error))
  }

}
