import { Body, Controller, Delete, Get,Param,Post, Put } from '@nestjs/common';
import { ChatService } from '../service';
import ResponceT from 'src/interface/responce';
import { Chat } from 'src/schema';

@Controller('api/chats')
export class ChatsController {
  constructor(private readonly chatService: ChatService) {}

  @Get(":id")
  async getChats(@Param("id") id: string): Promise<ResponceT> {
    return await this.chatService.getChat(id)
  }

  @Post()
  async createChats(@Body() chats:Chat): Promise<ResponceT> {
    return await this.chatService.createChat(chats)
  }

  @Put()
  async updateChats(@Body() chats:Chat): Promise<ResponceT> {
    return await this.chatService.updateChat(chats)
  }

  @Delete(":id")
  async deleteChats(@Param("id") id: string): Promise<ResponceT> {
    return await this.chatService.deleteChat(id)
  }
}
