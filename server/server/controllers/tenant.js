const tenant = require('../models').tenant;

module.exports = {
 
  list(req, res) {
    return tenant
      .findAll()
      .then(tenant => res.status(200).send(tenant))
      .catch(error => res.status(400).send(error));
  },

  tenantByEmail (req, res) {
    return tenant
      .findOne({
        where: {
          email: req.params.email
        }
      })
      .then(tenant => {
        if (!tenant) {
          return res.status(404).send({
            message: 'Tenant Not Found'
          })
        } else {
          return res.status(200).send(tenant)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  tenantById (req, res) {
    return tenant
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(tenant => {
        if (!tenant) {
          return res.status(404).send({
            message: 'Tenant Not Found'
          })
        } else {
          return res.status(200).send(tenant)
        }
      })
      .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return tenant
      .findById(req.params.id)
      .then(tenant => {
        if (!tenant) {
          return res.status(400).send({
            message: 'Tenant Not Found',
          });
        }
        return tenant
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    return tenant
      .create({
        id: req.body.id,
        name: req.body.name,
        profile: req.body.profile,
        email: req.body.email,
        phone: req.body.phone,
        fax: req.body.fax,
        url: req.body.url,
        logo: req.body.logo,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        postbox: req.body.postbox,   
        gst: req.body.gst,
        quotecode: req.body.quotecode,
        quotefirstnumber: req.body.quotefirstnumber,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      })
      .then(tenant => res.status(201).send(tenant))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return tenant
      .findById(req.params.id)
      .then(tenant => {
        if (!tenant) {
          return res.status(404).send({
            message: 'tenant Not Found',
          });
        }
        return tenant
          .update({
            name: req.body.name || tenant.name,
            profile: req.body.profile || tenant.profile,
            email: req.body.email || tenant.email,
            phone: req.body.phone || tenant.phone,
            fax: req.body.fax || tenant.fax,
            url: req.body.url || tenant.url,
            logo: req.body.logo || tenant.logo,
            country: req.body.country || tenant.country,
            city: req.body.city || tenant.city,
            address: req.body.address || tenant.address,
            postbox: req.body.postbox || tenant.postbox,
            gst: req.body.gst || tenant.gst,
            quotecode: req.body.quotecode || tenant.quotecode,
            quotefirstnumber: req.body.quotefirstnumber || tenant.quotefirstnumber
          })
          .then(() => res.status(200).send(tenant))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};