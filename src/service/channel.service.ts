import { Injectable } from '@nestjs/common';
import ResponceT from '../interface/responce';
import check_pass from '../lib/checkers';
import {
  Channel,
  channelDeleteSchema,
  channelGetSchema,
  channelPostSchema,
  channelPutSchema,
} from '../schema';
import { id_generator } from '../lib/handlers';
import { isEmpty } from 'lodash';
import { MongoGenericRepository } from 'src/model';
import { Model } from 'mongoose';
import { CheckResult } from 'src/interface/checkResult';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<Channel>,
  ) {}
  private channel = new MongoGenericRepository(this.channelModel);

  //ANCHOR - Get channel info service
  async getChannel(custom_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass: CheckResult = await check_pass({ custom_id }, channelGetSchema);

    if (pass.is_success) {
      const findedChannel: Channel = await this.channel.get(custom_id);

      if (!isEmpty(findedChannel)) {
        responce.data = findedChannel;
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

    const pass: CheckResult = await check_pass(channelInfo, channelPostSchema);

    if (pass.is_success) {
      const findedChannel: Channel = (
        await this.getChannel(channelInfo.custom_id)
      ).data;

      if (isEmpty(findedChannel)) {
        channelInfo.custom_id = id_generator();
        await this.channel.create(channelInfo);

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

    const pass: CheckResult = await check_pass(channelInfo, channelPutSchema);

    if (pass.is_success) {
      const findedChannel: Channel = (
        await this.getChannel(channelInfo.custom_id)
      ).data;

      if (!isEmpty(findedChannel)) {
        await this.channel.update(channelInfo.custom_id, channelInfo);

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
  async deleteChannel(custom_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass: CheckResult = await check_pass(
      { custom_id },
      channelDeleteSchema,
    );

    if (pass.is_success) {
      const findedChannel: Channel = (await this.getChannel(custom_id)).data;

      if (!isEmpty(findedChannel)) {
        await this.channel.delete(custom_id);

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
