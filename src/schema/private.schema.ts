import Joi = require('joi');

export const privatePostSchema = Joi.object({
  id: Joi.string().min(12).max(30),
  person_one_id: Joi.string().min(3).max(30).required(),
  person_two_id: Joi.string().min(3).max(30).required(),
});


export const privateDeleteSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
});
