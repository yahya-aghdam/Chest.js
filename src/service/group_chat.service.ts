import { Injectable } from '@nestjs/common';
import ResponceT from '../interface/responce';
import check_pass from '../lib/checkers';
import {
  Group_chat,
  groupChatDeleteSchema,
  groupChatGetSchema,
  groupChatPostSchema,
  groupChatPutSchema
} from '../schema';
import { id_generator } from '../lib/handlers';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { MongoGenericRepository } from 'src/core';
import { Model } from 'mongoose';
import { CheckResult } from 'src/interface/checkResult';

@Injectable()
export class GroupChatService {
  constructor(
    @InjectModel(Group_chat.name)
    private groupChatModel: Model<Group_chat>,
  ) {}
  private groupChat = new MongoGenericRepository(this.groupChatModel);

  //ANCHOR - Get private chat info service
  async getGroupChat(custom_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass:CheckResult = await check_pass({ custom_id }, groupChatGetSchema);

    if (pass.is_success) {
      const group_chat: Group_chat = await this.groupChat.get(custom_id)

      if (!isEmpty(group_chat)) {
        responce.data = group_chat;
        responce.is_success = true;
        responce.log = 'Group chat finded successfully';
      } else {
        responce.log = 'Group chat not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Create private chat service
  async createGroupChat(group_chatInfo: Group_chat): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass:CheckResult = await check_pass(group_chatInfo, groupChatPostSchema);
    

    if (pass.is_success) {
      const group_chat: Group_chat = (
        await this.getGroupChat(group_chatInfo.custom_id)
      ).data;

      if (isEmpty(group_chat)) {
        group_chatInfo.custom_id = id_generator();
        
        await this.groupChat.create(group_chatInfo)

        responce.data = group_chatInfo;
        responce.is_success = true;
        responce.log = 'Group chat created successfully';
      } else {
        responce.log = 'Group chat is exist';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Update private chat service
  async updateGroupChat(group_chatInfo: Group_chat): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass:CheckResult = await check_pass(group_chatInfo, groupChatPutSchema);

    if (pass.is_success) {
      const group_chat: Group_chat = (await this.getGroupChat(group_chatInfo.custom_id)).data;

      if (!isEmpty(group_chat)) {
        await this.groupChat.update(group_chatInfo.custom_id,group_chatInfo)

        responce.is_success = true;
        responce.log = 'Group chat updated successfully';
      } else {
        responce.log = 'Group chat not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Delete private chat service
  async deleteGroupChat(custom_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass:CheckResult = await check_pass({ custom_id }, groupChatDeleteSchema);

    if (pass.is_success) {
      const group_chat: Group_chat = (await this.getGroupChat(custom_id)).data;

      if (!isEmpty(group_chat)) {
        await this.groupChat.delete(custom_id)
        
        responce.is_success = true;
        responce.log = 'Group chat deleted successfully';
      } else {
        responce.log = 'Group chat not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }
}
