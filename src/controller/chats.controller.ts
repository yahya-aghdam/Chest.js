import { Body, Controller, Delete, Get,Param,Post, Put } from '@nestjs/common';
import { ChatsService } from '../service';
import ResponceT from 'src/interface/responce';
import { Chats } from '@prisma/client';

@Controller('api/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(":id")
  async getChats(@Param("id") id: string): Promise<ResponceT> {
    return await this.chatsService.getChats(id)
  }

  @Post()
  async createChats(@Body() chats:Chats): Promise<ResponceT> {
    return await this.chatsService.createChats(chats)
  }

  @Put()
  async updateChats(@Body() chats:Chats): Promise<ResponceT> {
    return await this.chatsService.updateChats(chats)
  }

  @Delete(":id")
  async deleteChats(@Param("id") id: string): Promise<ResponceT> {
    return await this.chatsService.deleteChats(id)
  }
}
