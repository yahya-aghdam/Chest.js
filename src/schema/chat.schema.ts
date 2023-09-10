import Joi = require('joi');
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

//* Schema
@Schema()
export class Chat {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  })
  custom_id: string;

  @Prop({
    required: true,
  })
  sender_custom_id: string;

  @Prop({
    required: true,
  })
  reciver_custom_id: string;

  @Prop({
    required: true,
  })
  is_mentioned: boolean;

  @Prop()
  mentioned_person_custom_id: string;

  @Prop({
    required: true,
  })
  message: string;

  @Prop({
    required: true,
  })
  time_stamp: string;
}

export type ChatDocument = mongoose.HydratedDocument<Chat>;
export const ChatSchema = SchemaFactory.createForClass(Chat);

// * Joi
export const chatPostSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
  sender_custom_id: Joi.string().min(3).max(30).required(),
  reciver_custom_id: Joi.string().min(3).max(30).required(),
  is_mentioned: Joi.boolean().required(),
  mentioned_person_custom_id: Joi.string().min(11).max(30),
  message: Joi.string().min(1).max(300).required(),
});

export const chatPutSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
  message: Joi.string().min(1).max(300),
  time_stamp: Joi.string().min(8).max(14),
});

export const chatGetSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});

export const chatDeleteSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});

export const chatGetAllSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
});
