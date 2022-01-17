const quoterequeststatus = require('../models').quoterequeststatus

module.exports = {

  list (req, res) {
    return quoterequeststatus
      .all()
      .then(quoterequeststatus => res.status(200).send(quoterequeststatus))
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return quoterequeststatus
      .findById(req.params.id)
      .then(quoterequeststatus => {
        if (!quoterequeststatus) {
          return res.status(400).send({
            message: 'Quote Request Status Not Found'
          })
        }
        return quoterequeststatus
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return quoterequeststatus
      .create({
        id: req.body.id,
        description: req.body.description,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(quoterequeststatus => res.status(201).send(quoterequeststatus))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return quoterequeststatus
      .findById(req.params.id)
      .then(quoterequeststatus => {
        if (!quoterequeststatus) {
          return res.status(404).send({
            message: 'Quote Request Status Not Found'
          })
        }
        return quoterequeststatus
          .update({
            description: req.body.description || quoterequeststatus.description
          })
          .then(() => res.status(200).send(quoterequeststatus))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  quoterequeststatusById (req, res) {
    return quoterequeststatus
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(quoterequeststatus => {
        if (!quoterequeststatus) {
          return res.status(404).send({
            message: 'Quote Request Status Not Found'
          })
        } else {
          return res.status(200).send(quoterequeststatus)
        }
      })
      .catch(error => res.status(400).send(error))
  }

}
