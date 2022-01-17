const quote = require('../models').quote;
var models  = require('../models');

module.exports = {
 
  list(req, res) {
    return quote
      .findAll()
      .then(quote => res.status(200).send(quote))
      .catch(error => res.status(400).send(error));
  },

  quoteById (req, res) {
    return quote
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quote => {
        if (!quote) {
          return res.status(404).send({
            message: 'Quote Not Found'
          })
        } else {
          return res.status(200).send(quote)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  quoteByTenant (req, res) {
    return quote
      .findAndCountAll({ // .findAndCountAl
        where: {
          tenant_id: req.params.tenant_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quote => {
        if (!quote) {
          return res.status(404).send({
            message: 'Quote Not Found'
          })
        } else {
          return res.status(200).send(quote)
        }
      })
      .catch(error => res.status(400).send(error))
  },
  
  quoteByUser (req, res) {
    return quote
      .findAll({
        where: {
          user_id: req.params.user_id
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quote => {
        if (!quote) {
          return res.status(404).send({
            message: 'Quote Not Found'
          })
        } else {
          return res.status(200).send(quote)
        }
      })
      .catch(error => res.status(400).send(error))
  },
 
  quoteByTenantAndNumber (req, res) {
    return quote
      .findOne({
        where: {
          tenant_id: req.params.tenant_id,
          number: req.params.number
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quote => {
        if (!quote) {
          return res.status(404).send({
            message: 'Quote Not Found'
          })
        } else {
          return res.status(200).send(quote)
        }
      })
      .catch(error => res.status(400).send(error))
  },
 
  quoteByNumber (req, res) {
    return quote
      .findOne({
        where: {
          number: req.params.number
        },
        include: [{ all: true,
          include: [{ all: true
          }]
        }]
      })
      .then(quote => {
        if (!quote) {
          return res.status(404).send({
            message: 'Quote Not Found'
          })
        } else {
          return res.status(200).send(quote)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return quote
      .findById(req.params.id)
      .then(quote => {
        if (!quote) {
          return res.status(400).send({
            message: 'Quote Not Found',
          });
        }
        return quote
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    return quote
      .create({
        id: req.body.id,
        name: req.body.name,
        number: req.body.number,
        description: req.body.description,
        totalprice: req.body.totalprice,
        revision: req.body.totalprice,
        address: req.body.address,
        workscope: req.body.workscope,
        quotestatus_id: req.body.quotestatus_id,
        tenant_id: req.body.tenant_id,
        user_id: req.body.user_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      })
      .then(quote => res.status(201).send(quote))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return quote
      .findById(req.params.id)
      .then(quote => {
        if (!quote) {
          return res.status(404).send({
            message: 'Quote Not Found',
          });
        }
        return quote
          .update({
            name: req.body.name || quote.name,
            number: req.body.number || quote.number,        
            revision: req.body.revision || quote.revision,
            address: req.body.address || quote.address,
            description: req.body.description || quote.description,
            totalprice: req.body.totalprice || quote.totalprice,
            workscope: req.body.workscope || quote.workscope,
            quotestatus_id: req.body.quotestatus_id || quote.quotestatus_id,     
            user_id: req.body.user_id || quote.user_id         
          })
          .then(() => res.status(200).send(quote))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};