const joi = require("joi");

const documentjoischema = joi
  .object({
    name: joi.string().required(),
  })
  .required();

module.exports = documentjoischema;
