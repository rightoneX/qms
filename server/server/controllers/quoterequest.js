const quoterequest = require('../models').quoterequest

module.exports = {

  list (req, res) {
    return quoterequest
      .all({
    })
      .then(quoterequest => res.status(200).send(quoterequest))
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return quoterequest
      .findById(req.params.id)
      .then(quoterequest => {
        if (!quoterequest) {
          return res.status(400).send({
            message: 'Quote Request Not Found'
          })
        }
        return quoterequest
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return quoterequest
      .create({
        id: req.body.id,
        revision: req.body.revision,
        description: req.body.description,
        note: req.body.note,
        requestedby: req.body.requestedby,
        quoterequeststatus_id: req.body.quoterequeststatus_id,
        quote_id: req.body.quote_id,
        contact_id: req.body.contact_id,
        client_id: req.body.client_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(quoterequest => res.status(201).send(quoterequest))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return quoterequest
      .findById(req.params.id)
      .then(quoterequest => {
        if (!quoterequest) {
          return res.status(404).send({
            message: 'Quote Request Not Found'
          })
        }
        return quoterequest
          .update({
            revision: req.body.revision || quoterequest.revision,
            note: req.body.note || quoterequest.note,
            requestedby: req.body.requestedby || quoterequest.requestedby,
            quoterequeststatus_id: req.body.quoterequeststatus_id || quoterequest.quoterequeststatus_id,
            quote_id: req.body.quote_id || quoterequest.quote_id,
            contact_id: req.body.contact_id || quoterequest.contact_id,
            client_id: req.body.client_id || quoterequest.client_id,
            description: req.body.description || quoterequest.description
          })
          .then(() => res.status(200).send(quoterequest))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  quoterequestById (req, res) {
    return quoterequest
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(quoterequest => {
        if (!quoterequest) {
          return res.status(404).send({
            message: 'Quote Request Not Found'
          })
        } else {
          return res.status(200).send(quoterequest)
        }
      })
      .catch(error => res.status(400).send(error))
  },
  
  quoterequestByQuote (req, res) {
    return quoterequest
      .findAll({
        where: {
          quote_id: req.params.quote_id
        },
        include: [{ all: true,
            include: [{ all: true
            }]
        }]
      })
      .then(quoterequest => {
        if (!quoterequest) {
          return res.status(404).send({
            message: 'Quote Request Not Found'
          })
        } else {
          return res.status(200).send(quoterequest)
        }
      })
      .catch(error => res.status(400).send(error))
  }


}
