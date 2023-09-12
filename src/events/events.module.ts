import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema, User, UserSchema } from 'src/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: User.name, schema: UserSchema },
    ])
  ],
  providers: [EventsGateway]
})
export class EventsModule {}
