const stock = require('../models').stock;

module.exports = {
 
  list(req, res) {
    return stock
      .findAll()
      .then(stock => res.status(200).send(stock))
      .catch(error => res.status(400).send(error));
  },

  stockById (req, res) {
    return stock
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(stock => {
        if (!stock) {
          return res.status(404).send({
            message: 'Stock Not Found'
          })
        } else {
          return res.status(200).send(stock)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  stockByTenant (req, res) {
    return stock
      .findAll({
        where: {
          tenant_id: req.params.tenant_id
        },
        include: [{
          all: true,
          include: [{
              all: true,
              include: [{
                all: true
              }]
          }]
        }]
      })
      .then(stock => {
        if (!stock) {
          return res.status(404).send({
            message: 'Stock Not Found'
          })
        } else {
          return res.status(200).send(stock)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return stock
      .findById(req.params.id)
      .then(stock => {
        if (!stock) {
          return res.status(400).send({
            message: 'Stock Not Found',
          });
        }
        return stock
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    return stock
      .create({
        id: req.body.id,
        sn: req.body.sn,
        note: req.body.note,
        stockin: req.body.stockin,
        stockout: req.body.stockout,
        tenant_id: req.body.tenant_id,
        pricelist_id: req.body.pricelist_id,
        stockcondition_id: req.body.stockcondition_id,
        stockstatus_id: req.body.stockstatus_id,
        stocklocation_id: req.body.stocklocation_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      })
      .then(stock => res.status(201).send(stock))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return stock
      .findById(req.params.id)
      .then(stock => {
        if (!stock) {
          return res.status(404).send({
            message: 'Stock Not Found',
          });
        }
        return stock
          .update({
            sn: req.body.sn || stock.sn,
            note: req.body.note || stock.note,
            stockin: req.body.stockin || stock.stockin,
            stockout: req.body.stockout || stock.stockout,
            tenant_id: req.body.tenant_id || stock.tenant_id,
            pricelist_id: req.body.pricelist_id || stock.pricelist_id,
            stockcondition_id: req.body.stockcondition_id|| stock.stockcondition_id,
            stockstatus_id: req.body.stockstatus_id || stock.stockstatus_id,
            stocklocation_id: req.body.stocklocation_id || stock.stocklocation_id 
          })
          .then(() => res.status(200).send(stock))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};