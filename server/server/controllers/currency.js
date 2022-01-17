const currency = require('../models').currency

module.exports = {

  list (req, res) {
    return currency
      .all()
      .then(currency => res.status(200).send(currency))
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return currency
      .findById(req.params.id)
      .then(currency => {
        if (!currency) {
          return res.status(400).send({
            message: 'Currency Not Found'
          })
        }
        return currency
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return currency
      .create({
        id: req.body.id,
        country: req.body.country,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(currency => res.status(201).send(currency))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return currency
      .findById(req.params.id)
      .then(currency => {
        if (!currency) {
          return res.status(404).send({
            message: 'Currency Not Found'
          })
        }
        return currency
          .update({
            country: req.body.country || currency.country
          })
          .then(() => res.status(200).send(currency))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  currencyById (req, res) {
    return currency
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(currency => {
        if (!currency) {
          return res.status(404).send({
            message: 'Currency Not Found'
          })
        } else {
          return res.status(200).send(currency)
        }
      })
      .catch(error => res.status(400).send(error))
  }

}
