import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { 
  Channel,
  ChannelSchema,
  Chats,
  ChatsSchema,
  Group_chat,
  Group_chatSchema,
  Privvate_chat,
  Privvate_chatSchema,
  User, 
  UserSchema ,
} from './';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    MongooseModule.forFeature([{ name: Chats.name, schema: ChatsSchema }]),
    MongooseModule.forFeature([{ name: Group_chat.name, schema: Group_chatSchema }]),
    MongooseModule.forFeature([{ name: Privvate_chat.name, schema: Privvate_chatSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export default class DBModule {}
