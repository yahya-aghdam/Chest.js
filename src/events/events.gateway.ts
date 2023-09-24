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
import { isEmpty } from 'lodash';

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
  private notificationInterval: NodeJS.Timeout;

  @WebSocketServer()
  server: Server;
 
  // Custom method to periodically send data
  private async sendRecivedMessagePeriodically(userInfo: {
    custom_id: string;
  }) {
    this.notificationInterval = setInterval(async () => {
      const data = (await this.chat.getAllChatsOfAUserBy(userInfo.custom_id,true))
        .data;
      if (!isEmpty(data)) {
        this.server.emit('sendMessageNotification', data);
      }
    }, 5000); // Send data every 5 second
  }
 
  @SubscribeMessage('sendMessage')
  async createMessage(
    @MessageBody() chatInfo: IncomeMessageT,
  ): Promise<ResponceT> {
    return await this.chat.createChat(chatInfo);
  }

  @SubscribeMessage('reciveAllMessages')
  async getAllMessages(
    @MessageBody() userInfo: { custom_id: string },
  ): Promise<ResponceT> {
    return await this.chat.getAllChatsOfAUserBy(userInfo.custom_id);
  }
 
  // find and send new message notification every 1 sec
  @SubscribeMessage('sendMessageNotification')
  async getNewMessages(@MessageBody() userInfo: { custom_id: string }) {
    await this.sendRecivedMessagePeriodically({
      custom_id: userInfo.custom_id,
    });
  }

  // Stop notification send
  @SubscribeMessage('stopSendingMessageNotification')
  stopSendingData() {
    clearInterval(this.notificationInterval);
    return {
      is_success: true,
      log: 'Sending message notification stopped successfully',
    };
  }

  @SubscribeMessage('updateChat')
  async updateChatInfo(@MessageBody() chat: Chat): Promise<ResponceT> {
    const chatUpdateInfo = await this.chat.updateChat(chat);
    return chatUpdateInfo;
  }
}
