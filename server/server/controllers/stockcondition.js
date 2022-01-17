const stockcondition = require('../models').stockcondition

module.exports = {

  list (req, res) {
    return stockcondition
      .all()
      .then(stockcondition => res.status(200).send(stockcondition))
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return stockcondition
      .findById(req.params.id)
      .then(stockcondition => {
        if (!stockcondition) {
          return res.status(400).send({
            message: 'Stock Condition Not Found'
          })
        }
        return stockcondition
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return stockcondition
      .create({
        id: req.body.id,
        description: req.body.description,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(stockcondition => res.status(201).send(stockcondition))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return stockcondition
      .findById(req.params.id)
      .then(stockcondition => {
        if (!stockcondition) {
          return res.status(404).send({
            message: 'Stock Condition Not Found'
          })
        }
        return stockcondition
          .update({
            description: req.body.description || stockcondition.description
          })
          .then(() => res.status(200).send(stockcondition))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  stockconditionById (req, res) {
    return stockcondition
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(stockcondition => {
        if (!stockcondition) {
          return res.status(404).send({
            message: 'Stock Condition Not Found'
          })
        } else {
          return res.status(200).send(stockcondition)
        }
      })
      .catch(error => res.status(400).send(error))
  }

}
