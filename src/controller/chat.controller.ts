import { Body, Controller, Delete, Get,Param,Post, Put } from '@nestjs/common';
import { ChatService } from '../service';
import ResponceT from '../interface/responce';
import { Chat } from '../schema';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(":id")
  async getChat(@Param("id") id: string): Promise<ResponceT> {
    return await this.chatService.getChat(id)
  }

  @Post()
  async createChat(@Body() chat:Chat): Promise<ResponceT> {
    return await this.chatService.createChat(chat)
  }

  @Put()
  async updateChat(@Body() chat:Chat): Promise<ResponceT> {
    return await this.chatService.updateChat(chat)
  }

  @Delete(":id")
  async deleteChat(@Param("id") id: string): Promise<ResponceT> {
    return await this.chatService.deleteChat(id)
  }
}
