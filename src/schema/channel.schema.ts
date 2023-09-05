import Joi = require('joi');

export const channelPostSchema = Joi.object({
  unique_id: Joi.string().min(12).max(30).required(),
  name: Joi.string().min(3).max(30).required(),
  admins: Joi.string().min(3).max(30).required(),
  members: Joi.string().min(3).max(30).required(),
});

export const channelPutSchema = Joi.object({
  unique_id: Joi.string().min(12).max(30).required(),
  name: Joi.string().min(3).max(30),
  admins: Joi.string().min(3).max(30),
  members: Joi.string().min(3).max(30),
});


export const channelGetSchema = Joi.object({
  unique_id: Joi.string().min(12).max(30).required(),
});

export const channelDeleteSchema = Joi.object({
  unique_id: Joi.string().min(12).max(30).required(),
});
