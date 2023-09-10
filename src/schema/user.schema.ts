import Joi = require('joi');
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

//* Schema
@Schema()
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  })
  custom_id: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop()
  name: string;

  @Prop()
  chats_id_list: string[];
}

export type UserDocument = mongoose.HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

// * Joi
export const userPostSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30),
  username: Joi.string().min(3).max(30).required(),
  name: Joi.string().min(3).max(30).required(),
});

export const userPutSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
  username: Joi.string().min(3).max(30),
  name: Joi.string().min(3).max(30),
  chats_id_list: Joi.object(),
});

export const userDeleteSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});

export const userGetSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});
