const user = require('../models').user

module.exports = {

  list (req, res) {
    return user
      .all()
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error))
  },

  userById (req, res) {
    return user
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found'
          })
        } else {
          return res.status(200).send(user)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  userByTenant (req, res) {
    return user
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        }
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found'
          })
        } else {
          return res.status(200).send(user)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return user
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'user Not Found'
          })
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return user
      .create({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        position: req.body.position,
        group_id: req.body.group_id,
        permission_id: req.body.permission_id,
        tenant_id: req.body.tenant_id,
        phone: req.body.phone,
        password: req.body.password,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return user
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found'
          })
        }
        return user
          .update({
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            email: req.body.email || user.email,  
            position: req.body.position || user.position,  
            phone: req.body.phone || user.phone,          
            group_id: req.body.group_id || user.group_id,
            permission_id: req.body.permission_id || user.permission_id,
            tenant_id: req.body.tenant_id || user.tenant_id,
            password: req.body.password || user.password
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  userLogin (req, res) {
    return user
      .findOne({
        where: {
          email: req.body.email,
          password: req.body.password
        }
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found'
          })
        } else {
          return res.status(200).send(user)
        }
      })
      .catch(error => res.status(400).send(error))
  }
}
