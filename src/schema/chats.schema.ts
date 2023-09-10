import Joi = require('joi');
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

//* Schema
@Schema()
export class Chats {
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
  admins: string[];

  @Prop({
    required: true,
  })
  is_mentioned: boolean;

  @Prop({
    required: true,
  })
  message: string;

  @Prop({
    required: true,
  })
  time_stamp: string;
}

export type ChatsDocument = mongoose.HydratedDocument<Chats>;
export const ChatsSchema = SchemaFactory.createForClass(Chats);

// * Joi
export const chatsPostSchema = Joi.object({
  custom_id: Joi.string().min(3).max(30).required(),
  sender_custom_id: Joi.string().min(3).max(30).required(),
  reciver_custom_id: Joi.string().min(3).max(30).required(),
  is_mentioned: Joi.boolean().required(),
  message: Joi.string().min(1).max(300).required(),
});

export const chatsPutSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
  message: Joi.string().min(1).max(300),
  time_stamp: Joi.string().min(8).max(14),
});

export const chatsGetSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});

export const chatsDeleteSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});

export const chatsGetAllSchema = Joi.object({
  id: Joi.string().min(12).max(30).required(),
});
