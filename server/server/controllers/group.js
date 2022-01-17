const group = require('../models').group
var models  = require('../models');

module.exports = {

  list (req, res) {
    return group
      .all({
         include: [ models.role ]
      })
      .then(group => res.status(200).send(group))
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return group
      .findById(req.params.id)
      .then(group => {
        if (!group) {
          return res.status(400).send({
            message: 'group Not Found'
          })
        }
        return group
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return group
      .create({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        role_id: req.body.role_id,
        tenant_id: req.body.tenant_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(group => res.status(201).send(group))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return group
      .findById(req.params.id)
      .then(group => {
        if (!group) {
          return res.status(404).send({
            message: 'group Not Found'
          })
        }
        return group
          .update({
            name: req.body.name || group.name,
            description: req.body.description || group.description,
            role_id: req.body.role_id || group.role_id,
            tenant_id: req.body.tenant_id || group.tenant_id
          })
          .then(() => res.status(200).send(group))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  groupByTenant (req, res) {
    return group
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        },
        include: [ models.role ]
      })
      .then(group => {
        if (!group) {
          return res.status(404).send({
            message: 'Group Item Not Found'
          })
        } else {
          return res.status(200).send(group)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  groupById (req, res) {
    return group
      .findOne({
        where: {
          id: req.params.id
        },
        include: [ models.role ]
      })
      .then(group => {
        if (!group) {
          return res.status(404).send({
            message: 'Group Item Not Found'
          })
        } else {
          return res.status(200).send(group)
        }
      })
      .catch(error => res.status(400).send(error))
  }

}
