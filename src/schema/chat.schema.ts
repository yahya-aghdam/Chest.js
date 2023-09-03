import Joi = require('joi');

export const chatPostSchema = Joi.object({
  id: Joi.string().min(12).max(30),
  chat_id: Joi.string().min(3).max(30).required(),
  message: Joi.string().min(1).max(300).required(),
  time_stamp: Joi.string().min(8).max(14).required(),
});

export const chatPutSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
  chat_id: Joi.string().min(3).max(30),
  message: Joi.string().min(1).max(300),
  time_stamp: Joi.string().min(8).max(14),
});

export const chatDeleteSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
});
