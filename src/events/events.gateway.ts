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

  private interval: NodeJS.Timeout;

  // Custom method to periodically send data
  private async sendRecivedMessagePeriodically(chatInfo: {
    custom_id: string;
  }) {
    this.interval = setInterval(async () => {
      const data = (await this.chat.getAllChatsOfAUser(chatInfo.custom_id))
        .data;
      this.server.emit('reciveMessage', data);
    }, 2000); // Send data every 1 second
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  async createMessage(
    @MessageBody() chatInfo: IncomeMessageT,
  ): Promise<ResponceT> {
    return await this.chat.createChat(chatInfo);
  }

  @SubscribeMessage('reciveMessage')
  startSendingData(@MessageBody() chatInfo: { custom_id: string }) {
    this.sendRecivedMessagePeriodically(chatInfo);
  }

  @SubscribeMessage('stopSendingRecivedMessage')
  stopSendingData(): ResponceT {
    // Clear the interval when needed
    clearInterval(this.interval);
    return {
      is_success: true,
      log: 'Stopped successfully',
    };
  }

  @SubscribeMessage('updateChat')
  async updateChatInfo(@MessageBody() chat: Chat): Promise<ResponceT> {
    const chatUpdateInfo = await this.chat.updateChat(chat);
    return chatUpdateInfo;
  }
}
