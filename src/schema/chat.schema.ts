import Joi = require('joi');
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

//* Schema
@Schema()
export class Chat {
  @Prop({
    type: Types.ObjectId,
    required: true,
    unique: true,
  })
  custom_id: string;

  @Prop({
    required: true,
  })
  chat_room_id: string;

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
  is_read: boolean;

  @Prop({
    required: true,
  })
  is_notified: boolean;

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

export type ChatDocument = HydratedDocument<Chat>;
export const ChatSchema = SchemaFactory.createForClass(Chat);

// * Joi
export const chatPostSchema = Joi.object({
  sender_custom_id: Joi.string().min(3).max(30).required(),
  reciver_custom_id: Joi.string().min(3).max(30).required(),
  chat_room_id: Joi.string().min(3).max(30).required(),
  is_read: Joi.boolean().required(),
  is_notified: Joi.boolean().required(),
  is_mentioned: Joi.boolean().required(),
  mentioned_person_custom_id: Joi.string().min(11).max(30),
  message: Joi.string().min(1).max(300).required(),
});

export const chatPutSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
  message: Joi.string().min(1).max(300),
  is_read: Joi.boolean(),
  is_notified: Joi.boolean(),
  is_mentioned: Joi.boolean(),
  mentioned_person_custom_id: Joi.string().min(11).max(30),
  time_stamp: Joi.string().min(8).max(14),
});

export const chatGetSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});

export const chatDeleteSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});

export const chatGetAllSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});
