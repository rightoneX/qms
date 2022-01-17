const relation = require('../models').relation

module.exports = {

  list (req, res) {
    return relation
      .all()
      .then(relation => res.status(200).send(relation))
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return relation
      .findById(req.params.id)
      .then(relation => {
        if (!relation) {
          return res.status(400).send({
            message: 'Relation Not Found'
          })
        }
        return relation
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  create (req, res) {
    return relation
      .create({
        id: req.body.id,
        code: req.body.code,
        description: req.body.description,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      })
      .then(relation => res.status(201).send(relation))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return relation
      .findById(req.params.id)
      .then(relation => {
        if (!relation) {
          return res.status(404).send({
            message: 'Relation Not Found'
          })
        }
        return relation
          .update({            
            description: req.body.description || relation.description
          })
          .then(() => res.status(200).send(relation))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  relationById (req, res) {
    return relation
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(relation => {
        if (!relation) {
          return res.status(404).send({
            message: 'Relation Not Found'
          })
        } else {
          return res.status(200).send(relation)
        }
      })
      .catch(error => res.status(400).send(error))
  }

}
