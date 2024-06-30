const Joi = require("joi");

const validateRegister = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(9).required(),
}).options({
  abortEarly: false,
});

const validateLogin = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(9).required(),
}).options({
  abortEarly: false,
});

const validateVideo = Joi.object({
  name: Joi.string().required(),
  link: Joi.string().required(),
}).options({
  abortEarly: false,
});

module.exports = {
  validateRegister,
  validateLogin,
  validateVideo,
};
