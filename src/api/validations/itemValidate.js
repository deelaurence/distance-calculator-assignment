const joi = require("joi");

const locationValidation = (Location) => {
  const schema = joi
    .object({
      locationName: joi.string().min(2).max(50).required(),
      phone: joi.number().min(2).required(),
      latitude: joi.number().max(360).required(),
      longitude: joi.number().max(360).required(),
      description: joi.string().min(2).max(250),
    })
    .unknown();
  return schema.validate(Location);
};

module.exports = { locationValidation };
