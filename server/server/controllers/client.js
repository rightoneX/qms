const client = require('../models').client;
const contact  = require('../models').contact;
const models  = require('../models');

module.exports = {
 
  list(req, res) {
    return client
      .findAll()
      .then(client => res.status(200).send(client))
      .catch(error => res.status(400).send(error));
  },

  clientByTenant (req, res) {
    return client
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        }
      })
      .then(client => {
        if (!client) {
          return res.status(404).send({
            message: 'Client Not Found'
          })
        } else {
          return res.status(200).send(client)
        }
      })
      .catch(error => res.status(400).send(error))
  },


  clientByTenantAndName (req, res) {
    return client
      .findAll({
        where: {
          tenant_id: req.params.tenant_id,       
          name: req.params.name
        }
      })
      .then(client => {
        if (!client) {
          return res.status(404).send({
            message: 'Client Not Found'
          })
        } else {
          return res.status(200).send(client)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  clientByTenantAndRelation (req, res) {
    return client
      .findAll({
        where: {
          tenant_id: req.params.tenant_id,          
          relation_id: req.params.relation_id
        }
      })
      .then(client => {
        if (!client) {
          return res.status(404).send({
            message: 'Client Not Found'
          })
        } else {
          return res.status(200).send(client)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  clientById (req, res) {
    return client
      .findAll({
        where: {
          id: req.params.id
        },
          include: [{ all: true
          }]
      })
      .then(client => {
        if (!client) {
          return res.status(404).send({
            message: 'Client Not Found'
          })
        } else {
          return res.status(200).send(client)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return client
      .findById(req.params.id)
      .then(client => {
        if (!client) {
          return res.status(400).send({
            message: 'Client Not Found',
          });
        }
        return client
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    return client
      .create({
        id: req.body.id,
        name: req.body.name,
        profile: req.body.profile,
        email: req.body.email,
        phone: req.body.phone,
        fax: req.body.fax,
        url: req.body.url,
        logo: req.body.logo,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        postbox: req.body.postbox,
        tenant_id: req.body.tenant_id,
        relation_id: req.body.relation_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      })
      .then(client => res.status(201).send(client))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return client
      .findById(req.params.id)
      .then(client => {
        if (!client) {
          return res.status(404).send({
            message: 'Client Not Found',
          });
        }
        return client
          .update({
            name: req.body.name || client.name,
            profile: req.body.profile || client.profile,
            email: req.body.email || client.email,
            phone: req.body.phone || client.phone,
            fax: req.body.fax || client.fax,
            url: req.body.url || client.url,
            logo: req.body.logo || client.logo,
            country: req.body.country || client.country,
            city: req.body.city || client.city,
            address: req.body.address || client.address,
            postbox: req.body.postbox || client.postboxn,
            relation_id: req.body.relation_id || client.relation_id
          })
          .then(() => res.status(200).send(client))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};