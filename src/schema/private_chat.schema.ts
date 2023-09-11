import Joi = require('joi');
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

//* Schema
@Schema()
export class Private_chat {
  @Prop({
    type: Types.ObjectId,
    required: true,
    unique: true,
  })
  custom_id: string;

  @Prop()
  persons: string[];
}

export type Private_chatDocument = HydratedDocument<Private_chat>;
export const Private_chatSchema = SchemaFactory.createForClass(Private_chat);

// * Joi
export const privateChatPostSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30),
  persons: Joi.object().required(),
});

export const privateChatDeleteSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});

export const privateChatGetSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});
