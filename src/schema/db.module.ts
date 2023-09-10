import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { 
  Channel,
  ChannelSchema,
  Chat,
  ChatSchema,
  Group_chat,
  Group_chatSchema,
  Private_chat,
  Private_chatSchema,
  User, 
  UserSchema ,
} from './';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: Group_chat.name, schema: Group_chatSchema }]),
    MongooseModule.forFeature([{ name: Private_chat.name, schema: Private_chatSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export default class DBModule {}
