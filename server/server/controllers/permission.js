const permission = require('../models').permission

module.exports = {

  list (req, res) {
    return permission
      .all()
      .then(permission => res.status(200).send(permission))
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return permission
      .findById(req.params.id)
      .then(permission => {
        if (!permission) {
          return res.status(400).send({
            message: 'Permission Not Found'
          })
        }
        return permission
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return permission
      .create({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        tenant_id: req.body.tenant_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(permission => res.status(201).send(permission))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return permission
      .findById(req.params.id)
      .then(permission => {
        if (!permission) {
          return res.status(404).send({
            message: 'Permission Not Found'
          })
        }
        return permission
          .update({
            name: req.body.name || permission.name,
            description: req.body.description || permission.description,
            tenant_id: req.body.tenant_id || permission.tenant_id
          })
          .then(() => res.status(200).send(permission))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  permissionById (req, res) {
    return permission
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(permission => {
        if (!permission) {
          return res.status(404).send({
            message: 'Permission Item Not Found'
          })
        } else {
          return res.status(200).send(permission)
        }
      })
      .catch(error => res.status(400).send(error))
  }
}
