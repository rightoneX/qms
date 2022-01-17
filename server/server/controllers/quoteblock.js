const quoteblock = require('../models').quoteblock;

module.exports = {
 
  list(req, res) {
    return quoteblock
      .findAll()
      .then(quoteblock => res.status(200).send(quoteblock))
      .catch(error => res.status(400).send(error));
  },

  quoteblockById (req, res) {
    return quoteblock
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quoteblock => {
        if (!quoteblock) {
          return res.status(404).send({
            message: 'Quote Block Not Found'
          })
        } else {
          return res.status(200).send(quoteblock)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  quoteblockByTenant (req, res) {
    return quoteblock
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quoteblock => {
        if (!quoteblock) {
          return res.status(404).send({
            message: 'Quote Block Not Found'
          })
        } else {
          return res.status(200).send(quoteblock)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  quoteblockByUser (req, res) {
    return quoteblock
      .findAll({
        where: {
          user_id: req.params.user_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quoteblock => {
        if (!quoteblock) {
          return res.status(404).send({
            message: 'Quote Block Not Found'
          })
        } else {
          return res.status(200).send(quoteblock)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  quoteblockByPriceList (req, res) {
    return quoteblock
      .findAll({
        where: {
          pricelist_id: req.params.pricelist_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quoteblock => {
        if (!quoteblock) {
          return res.status(404).send({
            message: 'Quote Block Not Found'
          })
        } else {
          return res.status(200).send(quoteblock)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return quoteblock
      .findById(req.params.id)
      .then(quoteblock => {
        if (!quoteblock) {
          return res.status(400).send({
            message: 'Quote Block Not Found',
          });
        }
        return quoteblock
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    return quoteblock
      .create({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        note: req.body.note,
        cost: req.body.cost,
        tenant_id: req.body.tenant_id,
        user_id: req.body.user_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      })
      .then(quoteblock => res.status(201).send(quoteblock))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return quoteblock
      .findById(req.params.id)
      .then(quoteblock => {
        if (!quoteblock) {
          return res.status(404).send({
            message: 'Quote Block Not Found',
          });
        }
        return quoteblock
          .update({
            name: req.body.name || quoteblock.name,      
            description: req.body.description || quoteblock.description,
            note: req.body.note || quoteblock.note,
            cost: req.body.cost || quoteblock.cost,            
            tenant_id: req.body.tenant_id || quoteblock.tenant_id,
            user_id: req.body.user_id || quoteblock.user_id         
          })
          .then(() => res.status(200).send(quoteblock))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};