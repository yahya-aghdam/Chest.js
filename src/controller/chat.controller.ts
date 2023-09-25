import { Body, Controller, Delete, Get,Param,Post, Put } from '@nestjs/common';
import { ChatService } from '../service';
import ResponceT from 'src/interface/responce';
import { Chat } from 'src/schema';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(":id")
  async getChat(@Param("id") id: string): Promise<ResponceT> {
    return await this.chatService.getChat(id)
  }

  @Post()
  async createChat(@Body() chats:Chat): Promise<ResponceT> {
    return await this.chatService.createChat(chats)
  }

  @Put()
  async updateChat(@Body() chats:Chat): Promise<ResponceT> {
    return await this.chatService.updateChat(chats)
  }

  @Delete(":id")
  async deleteChat(@Param("id") id: string): Promise<ResponceT> {
    return await this.chatService.deleteChat(id)
  }
}
