import Joi = require('joi');

export const groupePostSchema = Joi.object({
  id: Joi.string().min(12).max(30),
  admins: Joi.string().min(3).max(30).required(),
  members: Joi.string().min(3).max(30).required(),
});

export const groupePutSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
  admins: Joi.string().min(3).max(30),
  members: Joi.string().min(3).max(30),
});


export const groupeDeleteSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
});
