const contact = require('../models').contact;
var models  = require('../models');

module.exports = {

  list (req, res) {
    return contact
      .all()
      .then(contact => res.status(200).send(contact))
      .catch(error => res.status(400).send(error))
  },

  contactById (req, res) {
    return contact
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(contact => {
        if (!contact) {
          return res.status(404).send({
            message: 'contact Not Found'
          })
        } else {
          return res.status(200).send(contact)
        }
      })
      .catch(error => res.status(400).send(error))
  },
  
  contactByTenant (req, res) {
    return contact
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        },
        include: [ models.client ]
      })
      .then(contact => {
        if (!contact) {
          return res.status(404).send({
            message: 'contact Not Found'
          })
        } else {
          return res.status(200).send(contact)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  contactByClient (req, res) {
    return contact
      .findAll({
        where: {
          client_id: req.params.client_id
        }
      })
      .then(contact => {
        if (!contact) {
          return res.status(404).send({
            message: 'contact Not Found'
          })
        } else {
          return res.status(200).send(contact)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  contactByClientAndName (req, res) {
    return contact
      .findOne({
        where: {
          client_id: req.params.client_id,
          firstName: req.params.firstName,
          lastName: req.params.lastName
        }
      })
      .then(contact => {
        if (!contact) {
          return res.status(404).send({
            message: 'contact Not Found'
          })
        } else {
          return res.status(200).send(contact)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return contact
      .findById(req.params.id)
      .then(contact => {
        if (!contact) {
          return res.status(400).send({
            message: 'contact Not Found'
          })
        }
        return contact
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return contact
      .create({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        phone: req.body.phone,
        mobile: req.body.mobile,
        email: req.body.email,
        client_id: req.body.client_id,
        tenant_id: req.body.tenant_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(contact => res.status(201).send(contact))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return contact
      .findById(req.params.id)
      .then(contact => {
        if (!contact) {
          return res.status(404).send({
            message: 'Contact Not Found'
          })
        }
        return contact
          .update({
            firstName: req.body.firstName || contact.firstName,
            lastName: req.body.lastName || contact.lastName,
            position: req.body.position || contact.position, 
            mobile: req.body.mobile || contact.mobile,   
            phone: req.body.phone || contact.phone,   
            email: req.body.email || contact.email,     
            client_id: req.body.client_id || contact.client_id
          })
          .then(() => res.status(200).send(contact))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },
}
