const quotestatus = require('../models').quotestatus

module.exports = {

  list (req, res) {
    return quotestatus
      .all()
      .then(quotestatus => res.status(200).send(quotestatus))
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return quotestatus
      .findById(req.params.id)
      .then(quotestatus => {
        if (!quotestatus) {
          return res.status(400).send({
            message: 'Quote Status  Not Found'
          })
        }
        return quotestatus
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return quotestatus
      .create({
        id: req.body.id,
        description: req.body.description,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(quotestatus => res.status(201).send(quotestatus))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return quotestatus
      .findById(req.params.id)
      .then(quotestatus => {
        if (!quotestatus) {
          return res.status(404).send({
            message: 'Quote Status  Not Found'
          })
        }
        return quotestatus
          .update({
            description: req.body.description || quotestatus.description
          })
          .then(() => res.status(200).send(quotestatus))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  quotestatusById (req, res) {
    return quotestatus
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(quotestatus => {
        if (!quotestatus) {
          return res.status(404).send({
            message: 'Quote Status  Not Found'
          })
        } else {
          return res.status(200).send(quotestatus)
        }
      })
      .catch(error => res.status(400).send(error))
  }

}
