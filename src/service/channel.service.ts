import { Injectable } from '@nestjs/common';
import ResponceT from '../interface/responce';
import { Channel } from '@prisma/client';
import check_pass from '../lib/checkers';
import {
  channelDeleteSchema,
  channelGetSchema,
  channelPostSchema,
  channelPutSchema
} from '../schema';
import prisma from '../lib/prisma';
import { id_generator } from '../lib/handlers';
import { isEmpty } from 'lodash';

@Injectable()
export class ChannelService {
  //ANCHOR - Get channel info service
  async getChannel(unique_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ unique_id }, channelGetSchema);

    if (pass.is_success) {
      const channel: Channel = (await prisma.channel.findUnique({
        where: {
          unique_id: unique_id,
        },
      })) as Channel;

      if (!isEmpty(channel)) {
        responce.data = channel;
        responce.is_success = true;
        responce.log = 'Channel finded successfully';
      } else {
        responce.log = 'Channel not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Create channel service
  async createChannel(channelInfo: Channel): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass(channelInfo, channelPostSchema);
    

    if (pass.is_success) {
      const channel: Channel = (
        await this.getChannel(channelInfo.unique_id)
      ).data;

      if (isEmpty(channel)) {
        channelInfo.unique_id = id_generator();
        await prisma.channel.create({
          data: channelInfo,
        });

        responce.data = channelInfo;
        responce.is_success = true;
        responce.log = 'Channel created successfully';
      } else {
        responce.log = 'Channel is exist';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Update channel service
  async updateChannel(channelInfo: Channel): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass(channelInfo, channelPutSchema);

    if (pass.is_success) {
      const channel: Channel = (await this.getChannel(channelInfo.unique_id)).data;

      if (!isEmpty(channel)) {
        await prisma.channel.update({
          where: {
            unique_id: channelInfo.unique_id,
          },
          data:channelInfo
        });
        responce.is_success = true;
        responce.log = 'Channel deleted successfully';
      } else {
        responce.log = 'Channel not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Delete channel service
  async deleteChannel(unique_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ unique_id }, channelDeleteSchema);

    if (pass.is_success) {
      const channel: Channel = (await this.getChannel(unique_id)).data;

      if (!isEmpty(channel)) {
        await prisma.channel.delete({
          where: {
            unique_id: unique_id,
          },
        });
        responce.is_success = true;
        responce.log = 'Channel deleted successfully';
      } else {
        responce.log = 'Channel not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }
}