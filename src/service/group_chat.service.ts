import { Injectable } from '@nestjs/common';
import ResponceT from '../interface/responce';
import { Group_chat } from '@prisma/client';
import check_pass from '../lib/checkers';
import {
  groupChatDeleteSchema,
  groupChatGetSchema,
  groupChatPostSchema,
  groupChatPutSchema
} from '../schema';
import prisma from '../lib/prisma';
import { id_generator } from '../lib/handlers';
import { isEmpty } from 'lodash';

@Injectable()
export class GroupChatService {
  //ANCHOR - Get private chat info service
  async getGroupChat(id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ id }, groupChatGetSchema);

    if (pass.is_success) {
      const group_chat: Group_chat = (await prisma.group_chat.findUnique({
        where: {
          id: id,
        },
      })) as Group_chat;

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

    const pass = await check_pass(group_chatInfo, groupChatPostSchema);
    

    if (pass.is_success) {
      const group_chat: Group_chat = (
        await this.getGroupChat(group_chatInfo.id)
      ).data;

      if (isEmpty(group_chat)) {
        group_chatInfo.id = id_generator();
        await prisma.group_chat.create({
          data: group_chatInfo,
        });

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

    const pass = await check_pass(group_chatInfo, groupChatPutSchema);

    if (pass.is_success) {
      const group_chat: Group_chat = (await this.getGroupChat(group_chatInfo.id)).data;

      if (!isEmpty(group_chat)) {
        await prisma.group_chat.update({
          where: {
            id: group_chatInfo.id,
          },
          data:group_chatInfo
        });
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
  async deleteGroupChat(id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ id }, groupChatDeleteSchema);

    if (pass.is_success) {
      const group_chat: Group_chat = (await this.getGroupChat(id)).data;

      if (!isEmpty(group_chat)) {
        await prisma.group_chat.delete({
          where: {
            id: id,
          },
        });
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
