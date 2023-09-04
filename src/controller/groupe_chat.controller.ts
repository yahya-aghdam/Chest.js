import { Body, Controller, Delete, Get,Param,Post, Put } from '@nestjs/common';
import { GroupeChatService } from '../service';
import ResponceT from 'src/interface/responce';
import { Groupe_chat } from '@prisma/client';

@Controller('api/groupe_chat')
export class GroupeChatController {
  constructor(private readonly groupeChatService: GroupeChatService) {}

  @Get(":id")
  async getGroupeChat(@Param("id") id: string): Promise<ResponceT> {
    return await this.groupeChatService.getGroupeChat(id)
  }

  @Post()
  async createGroupeChat(@Body() groupeChat:Groupe_chat): Promise<ResponceT> {
    return await this.groupeChatService.createGroupeChat(groupeChat)
  }

  @Put()
  async updateGroupeChat(@Body() groupeChat:Groupe_chat): Promise<ResponceT> {
    return await this.groupeChatService.updateGroupeChat(groupeChat)
  }

  @Delete(":id")
  async deleteGroupeChat(@Param("id") id: string): Promise<ResponceT> {
    return await this.groupeChatService.deleteGroupeChat(id)
  }
}
