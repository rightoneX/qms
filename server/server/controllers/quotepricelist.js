const quotepricelist= require('../models').quotepricelist;

module.exports = {
 
  list(req, res) {
    return quotepricelist
      .findAll()
      .then(quotepricelist=> res.status(200).send(quotepricelist))
      .catch(error => res.status(400).send(error));
  },

  quotepricelistById (req, res) {
    return quotepricelist
      .findAll({
        where: {
          id: req.params.id
        },
        include: [{ all: true,
          include: [{ all: true,
            include: [{ all: true
            }]
          }]
        }]
      })
      .then(quotepricelist=> {
        if (!quotepricelist) {
          return res.status(404).send({
            message: 'Quote Price List Not Found'
          })
        } else {
          return res.status(200).send(quotepricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  quotepricelistByQuoteBlock (req, res) {
    return quotepricelist
      .findAll({
        where: {
          quoteblock_id: req.params.quoteblock_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quotepricelist=> {
        if (!quotepricelist) {
          return res.status(404).send({
            message: 'Quote Price List Not Found'
          })
        } else {
          return res.status(200).send(quotepricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  quotepricelistByPriceList (req, res) {
    return quotepricelist
      .findAll({
        where: {
          pricelist_id: req.params.pricelist_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quotepricelist=> {
        if (!quotepricelist) {
          return res.status(404).send({
            message: 'Quote Price List Not Found'
          })
        } else {
          return res.status(200).send(quotepricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },
  
  quotepricelistByUser (req, res) {
    return quotepricelist
      .findAll({
        where: {
          user_id: req.params.user_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quotepricelist=> {
        if (!quotepricelist) {
          return res.status(404).send({
            message: 'Quote Price List Not Found'
          })
        } else {
          return res.status(200).send(quotepricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },
  
  quotepricelistByTenant (req, res) {
    return quotepricelist
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quotepricelist=> {
        if (!quotepricelist) {
          return res.status(404).send({
            message: 'Quote Price List Not Found'
          })
        } else {
          return res.status(200).send(quotepricelist)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return quotepricelist
      .findById(req.params.id)
      .then(quotepricelist=> {
        if (!quotepricelist) {
          return res.status(400).send({
            message: 'Quote Price List Not Found',
          });
        }
        return quotepricelist
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    return quotepricelist
      .create({
        id: req.body.id,
        brand: req.body.brand,
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        margin: req.body.margin,
        cost: req.body.cost,
        note: req.body.note,
        qty: req.body.qty,
        pricelist_id: req.body.pricelist_id,
        tenant_id: req.body.tenant_id,
        user_id: req.body.user_id,
        quoteblock_id: req.body.quoteblock_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      })
      .then(quotepricelist=> res.status(201).send(quotepricelist))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return quotepricelist
      .findById(req.params.id)
      .then(quotepricelist=> {
        if (!quotepricelist) {
          return res.status(404).send({
            message: 'Quote Price List Not Found',
          });
        }
        return quotepricelist
          .update({
            brand: req.body.brand || quotepricelist.brand,
            name: req.body.name || quotepricelist.name,
            type: req.body.type || quotepricelist.type,
            price: req.body.price || quotepricelist.price, 
            margin: req.body.margin || quotepricelist.margin,
            cost: req.body.cost || quotepricelist.cost,
            qty: req.body.qty || quotepricelist.qty,       
            note: req.body.note || quotepricelist.note,
            pricelist_id: req.body.pricelist_id || quotepricelist.pricelist_id
          })
          .then(() => res.status(200).send(quotepricelist))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};