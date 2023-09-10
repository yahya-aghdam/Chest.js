import { Module } from '@nestjs/common';
import {
  UserController,
  PrivateChatController,
  ChannelController,
  GroupChatController,
  ChatsController,
} from './controller';
import {
  UserService,
  PrivateChatService,
  ChannelService,
  GroupChatService,
  ChatsService,
} from './service';
import EventsModule from './events/events.module';
import DBModule from './schema/db.module';

@Module({
  imports: [EventsModule, DBModule],
  controllers: [
    UserController,
    PrivateChatController,
    ChannelController,
    GroupChatController,
    ChatsController,
  ],
  providers: [
    UserService,
    PrivateChatService,
    ChannelService,
    GroupChatService,
    ChatsService,
  ],
})
export class AppModule {}
