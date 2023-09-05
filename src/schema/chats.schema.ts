import Joi = require('joi');

export const chatsPostSchema = Joi.object({
  chat_id: Joi.string().min(3).max(30).required(),
  sender_unique_id: Joi.string().min(3).max(30).required(),
  message: Joi.string().min(1).max(300).required(),
});

export const chatsPutSchema = Joi.object({
  unique_id: Joi.string().min(12).max(30).required(),
  message: Joi.string().min(1).max(300),
  time_stamp: Joi.string().min(8).max(14),
});

export const chatsGetSchema = Joi.object({
  chat_id: Joi.string().min(12).max(30).required(),
});

export const chatsDeleteSchema = Joi.object({
  unique_id: Joi.string().min(12).max(30).required(),
});
