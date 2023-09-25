import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {EventsModule} from './events/events.module';
import {
  UserController,
  PrivateChatController,
  ChannelController,
  GroupChatController,
  ChatController,
} from './controller';
import {
  UserService,
  PrivateChatService,
  ChannelService,
  GroupChatService,
  ChatService,
} from './service';
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
  UserSchema,
} from './schema';

@Module({
  imports: [
    EventsModule,
    MongooseModule.forFeature([
      { name: Channel.name, schema: ChannelSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: Group_chat.name, schema: Group_chatSchema },
      { name: Private_chat.name, schema: Private_chatSchema },
      { name: User.name, schema: UserSchema },
    ]),
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
  
  controllers: [
    UserController,
    PrivateChatController,
    ChannelController,
    GroupChatController,
    ChatController,
  ],
  providers: [
    UserService,
    PrivateChatService,
    ChannelService,
    GroupChatService,
    ChatService,
  ],
})
export class AppModule {}
