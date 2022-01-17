const role = require('../models').role

module.exports = {

  list (req, res) {
    return role
      .all()
      .then(role => res.status(200).send(role))
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return role
      .findById(req.params.id)
      .then(role => {
        if (!role) {
          return res.status(400).send({
            message: 'Role Not Found'
          })
        }
        return role
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return role
      .create({        
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        tenant_id: req.body.tenant_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return role
      .findById(req.params.id)
      .then(role => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found'
          })
        }
        return role
          .update({
            name: req.body.name || role.name,
            description: req.body.description || role.description,
            tenant_id: req.body.tenant_id || role.tenant_id
          })
          .then(() => res.status(200).send(role))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  roleByTenant (req, res) {
    return role
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        }
      })
      .then(role => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Item Not Found'
          })
        } else {
          return res.status(200).send(role)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  roleById (req, res) {
    return role
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(role => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Item Not Found'
          })
        } else {
          return res.status(200).send(role)
        }
      })
      .catch(error => res.status(400).send(error))
  }
}
