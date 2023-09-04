import Joi = require('joi');

export const privateChatPostSchema = Joi.object({
  persons: Joi.string().min(3).max(100).required(),
});

export const privateChatDeleteSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
});

export const privateChatGetSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
});
