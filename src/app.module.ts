import { Module } from '@nestjs/common';
import {
  UserController,
  PrivateChatController,
  ChannelController,
  GroupeChatController,
  ChatsController
} from './controller';
import {
  UserService,
  PrivateChatService,
  ChannelService,
  GroupeChatService,
  ChatsService
} from './service';

@Module({
  imports: [],
  controllers: [
    UserController,
    PrivateChatController,
    ChannelController,
    GroupeChatController,
    ChatsController
  ],
  providers: [
    UserService,
    PrivateChatService,
    ChannelService,
    GroupeChatService,
    ChatsService
  ],
})
export class AppModule {}
