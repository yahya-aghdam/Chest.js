import Joi = require('joi');

export const userPostSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  name: Joi.string().min(3).max(30).required(),
});

export const userPutSchema = Joi.object({
  unique_id: Joi.string().min(12).max(30).required(),
  username: Joi.string().min(3).max(30),
  name: Joi.string().min(3).max(30),
  chats:Joi.string().min(3).max(1000),
});

export const userDeleteSchema = Joi.object({
  unique_id: Joi.string().min(12).max(30).required(),
});

export const userGetSchema = Joi.object({
  unique_id: Joi.string().min(12).max(30).required(),
});
