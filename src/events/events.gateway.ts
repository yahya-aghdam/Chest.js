import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import { MongoGenericRepository } from 'src/model';
import IncomeMessageT from 'src/interface/incomeMessage';
import ResponceT from 'src/interface/responce';
import { Chat } from 'src/schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  private chatModel: Model<Chat>
  

  @SubscribeMessage('sendMessage')
  async createMessage(
    @MessageBody() chatInfo: IncomeMessageT,
  ): Promise<ResponceT> {
    const chat = new MongoGenericRepository(this.chatModel);
    const responce: ResponceT = {
      is_success: true,
      log: "Chat sent successfully",
    };
    responce.data = await chat.create(chatInfo);

    return responce;
  }

  @SubscribeMessage('reciveMessage')
  async checkMessage(
    @MessageBody() chatInfo: { chat_id: string },
  ): Promise<ResponceT> {
    const chat = new MongoGenericRepository(this.chatModel);
    const responce: ResponceT = {
      is_success: true,
      log: "Chat recived successfully",
    };
    responce.data = await chat.get(chatInfo.chat_id);

    return responce;
  }
}
