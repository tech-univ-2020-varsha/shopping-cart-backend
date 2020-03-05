const Joi = require('@hapi/joi');

const updateCartSchema = Joi.object().keys({
  products: Joi.array().required(),
});

module.exports = { updateCartSchema };
