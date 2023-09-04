import { Module } from '@nestjs/common';
import {
  UserController,
  PrivateChatController,
  ChannelController,
  GroupChatController,
  ChatsController
} from './controller';
import {
  UserService,
  PrivateChatService,
  ChannelService,
  GroupChatService,
  ChatsService
} from './service';

@Module({
  imports: [],
  controllers: [
    UserController,
    PrivateChatController,
    ChannelController,
    GroupChatController,
    ChatsController
  ],
  providers: [
    UserService,
    PrivateChatService,
    ChannelService,
    GroupChatService,
    ChatsService
  ],
})
export class AppModule {}
