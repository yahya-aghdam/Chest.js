import { Body, Controller, Delete, Get,Param,Post, Put } from '@nestjs/common';
import { ChannelService } from '../service';
import ResponceT from 'src/interface/responce';
import { Channel } from 'src/schema';

@Controller('api/channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get(":id")
  async getChannel(@Param("id") id: string): Promise<ResponceT> {
    return await this.channelService.getChannel(id)
  }

  @Post()
  async createChannel(@Body() channel:Channel): Promise<ResponceT> {
    return await this.channelService.createChannel(channel)
  }

  @Put()
  async updateChannel(@Body() channel:Channel): Promise<ResponceT> {
    return await this.channelService.updateChannel(channel)
  }

  @Delete(":id")
  async deleteChannel(@Param("id") id: string): Promise<ResponceT> {
    return await this.channelService.deleteChannel(id)
  }
}
