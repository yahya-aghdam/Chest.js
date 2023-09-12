import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import IncomeMessageT from 'src/interface/incomeMessage';
import ResponceT from 'src/interface/responce';
import { Chat, User } from 'src/schema';
import { InjectModel } from '@nestjs/mongoose';
import { ChatService } from 'src/service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  private chat = new ChatService(this.chatModel, this.userModel);

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  async createMessage(
    @MessageBody() chatInfo: IncomeMessageT,
  ): Promise<ResponceT> {
    return await this.chat.createChat(chatInfo);
  }

  @SubscribeMessage('reciveMessage')
  async checkMessage(
    @MessageBody() chatInfo: { chat_id: string },
  ): Promise<ResponceT> {
    return await this.chat.getAllChatsOfAUser(chatInfo.chat_id);
  }
}
