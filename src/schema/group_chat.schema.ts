import Joi = require('joi');

export const groupChatPostSchema = Joi.object({
  id: Joi.string().min(12).max(30),
  name: Joi.string().min(3).max(30).required(),
  admins: Joi.string().min(3).max(30).required(),
  members: Joi.string().min(3).max(30).required(),
});

export const groupChatPutSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
  name: Joi.string().min(3).max(30),
  admins: Joi.string().min(3).max(30),
  members: Joi.string().min(3).max(30),
});


export const groupChatGetSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
});

export const groupChatDeleteSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
});
