import Joi = require('joi');

export const privateChatPostSchema = Joi.object({
  id: Joi.string().min(12).max(30),
  person_one_id: Joi.string().min(3).max(30).required(),
  person_two_id: Joi.string().min(3).max(30).required(),
});

export const privateChatDeleteSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
});

export const privateChatGetSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
});
