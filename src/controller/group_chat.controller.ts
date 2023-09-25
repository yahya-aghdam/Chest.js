import { Body, Controller, Delete, Get,Param,Post, Put } from '@nestjs/common';
import { GroupChatService } from '../service';
import ResponceT from '../interface/responce';
import { Group_chat } from '../schema';

@Controller('api/group_chat')
export class GroupChatController {
  constructor(private readonly groupChatService: GroupChatService) {}

  @Get(":id")
  async getGroupChat(@Param("id") id: string): Promise<ResponceT> {
    return await this.groupChatService.getGroupChat(id)
  }

  @Post()
  async createGroupChat(@Body() groupChat:Group_chat): Promise<ResponceT> {
    return await this.groupChatService.createGroupChat(groupChat)
  }

  @Put()
  async updateGroupChat(@Body() groupChat:Group_chat): Promise<ResponceT> {
    return await this.groupChatService.updateGroupChat(groupChat)
  }

  @Delete(":id")
  async deleteGroupChat(@Param("id") id: string): Promise<ResponceT> {
    return await this.groupChatService.deleteGroupChat(id)
  }
}
