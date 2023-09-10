import Joi = require('joi');
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

//* Schema
@Schema()
export class Privvate_chat {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  })
  custom_id: string;

  @Prop()
  persons: string[];
}

export type Privvate_chatDocument = mongoose.HydratedDocument<Privvate_chat>;
export const Privvate_chatSchema = SchemaFactory.createForClass(Privvate_chat);

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
