import Joi = require('joi');
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

//* Schema
@Schema()
export class Channel {
  @Prop({
    type: Types.ObjectId,
    required: true,
    unique: true,
  })
  custom_id: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  admins: string[];

  @Prop({
    required: true,
  })
  members: string[];
}

export type ChannelDocument = HydratedDocument<Channel>;
export const ChannelSchema = SchemaFactory.createForClass(Channel);

// * Joi
export const channelPostSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30),
  name: Joi.string().min(3).max(30).required(),
  admins: Joi.array().min(1).max(100).required(),
  members: Joi.array().min(1).max(10000).required(),
});

export const channelPutSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
  name: Joi.string().min(3).max(30),
  admins: Joi.array().min(1).max(100),
  members: Joi.array().min(1).max(1000),
});

export const channelGetSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});

export const channelDeleteSchema = Joi.object({
  custom_id: Joi.string().min(12).max(30).required(),
});
