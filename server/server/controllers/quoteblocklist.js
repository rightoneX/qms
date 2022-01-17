const quoteblocklist = require('../models').quoteblocklist;
var models  = require('../models');

module.exports = {
 
  list(req, res) {
    return quoteblocklist
      .findAll()
      .then(quoteblocklist => res.status(200).send(quoteblocklist))
      .catch(error => res.status(400).send(error));
  },

  quoteblocklistById (req, res) {
    return quoteblocklist
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quoteblocklist => {
        if (!quoteblocklist) {
          return res.status(404).send({
            message: 'Quote Block List  Not Found'
          })
        } else {
          return res.status(200).send(quoteblocklist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  quoteblocklistByTenant (req, res) {
    return quoteblocklist
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quoteblocklist => {
        if (!quoteblocklist) {
          return res.status(404).send({
            message: 'Quote Block List  Not Found'
          })
        } else {
          return res.status(200).send(quoteblocklist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  
  quoteblocklistByQuote (req, res) {
    return quoteblocklist
      .findAll({
        where: {
          quote_id: req.params.quote_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quoteblocklist => {
        if (!quoteblocklist) {
          return res.status(404).send({
            message: 'Quote Block List  Not Found'
          })
        } else {
          return res.status(200).send(quoteblocklist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  quoteblocklistByQutoeBlock (req, res) {
    return quoteblocklist
      .findAll({
        where: {
          quoteblock_id: req.params.quoteblock_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quoteblocklist => {
        if (!quoteblocklist) {
          return res.status(404).send({
            message: 'Quote Block List  Not Found'
          })
        } else {
          return res.status(200).send(quoteblocklist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return quoteblocklist
      .findById(req.params.id)
      .then(quoteblocklist => {
        if (!quoteblocklist) {
          return res.status(400).send({
            message: 'Quote Block List  Not Found',
          });
        }
        return quoteblocklist
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    return quoteblocklist
      .create({
        id: req.body.id,
        qty: req.body.qty,
        price: req.body.price,
        cost: req.body.cost,
        margin: req.body.margin,
        tenant_id: req.body.tenant_id,
        quote_id: req.body.quote_id,
        quoteblock_id: req.body.quoteblock_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      })
      .then(quoteblocklist => res.status(201).send(quoteblocklist))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return quoteblocklist
      .findById(req.params.id)
      .then(quoteblocklist => {
        if (!quoteblocklist) {
          return res.status(404).send({
            message: 'Quote Block List  Not Found',
          });
        }
        return quoteblocklist
          .update({
            qty: req.body.qty || quoteblock.qty,
            price: req.body.price || quoteblock.price,
            cost: req.body.cost || quoteblock.cost,
            margin: req.body.margin || quoteblock.margin,
            tenant_id: req.body.tenant_id || quoteblock.tenant_id,
            quote_id: req.body.quote_id || quoteblock.quote_id, 
            quoteblock_id: req.body.quoteblock_id || quoteblock.quoteblock_id          
          })
          .then(() => res.status(200).send(quoteblock))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};