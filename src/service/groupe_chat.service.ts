import { Injectable } from '@nestjs/common';
import ResponceT from '../interface/responce';
import { Groupe_chat } from '@prisma/client';
import check_pass from '../lib/checkers';
import {
  groupeChatDeleteSchema,
  groupeChatGetSchema,
  groupeChatPostSchema,
  groupeChatPutSchema
} from '../schema';
import prisma from '../lib/prisma';
import { id_generator } from '../lib/handlers';
import { isEmpty } from 'lodash';

@Injectable()
export class GroupeChatService {
  //ANCHOR - Get private chat info service
  async getGroupeChat(id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ id }, groupeChatGetSchema);

    if (pass.is_success) {
      const groupe_chat: Groupe_chat = (await prisma.groupe_chat.findUnique({
        where: {
          id: id,
        },
      })) as Groupe_chat;

      if (!isEmpty(groupe_chat)) {
        responce.data = groupe_chat;
        responce.is_success = true;
        responce.log = 'Groupe chat finded successfully';
      } else {
        responce.log = 'Groupe chat not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Create private chat service
  async createGroupeChat(groupe_chatInfo: Groupe_chat): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass(groupe_chatInfo, groupeChatPostSchema);
    

    if (pass.is_success) {
      const groupe_chat: Groupe_chat = (
        await this.getGroupeChat(groupe_chatInfo.id)
      ).data;

      if (isEmpty(groupe_chat)) {
        groupe_chatInfo.id = id_generator();
        await prisma.groupe_chat.create({
          data: groupe_chatInfo,
        });

        responce.data = groupe_chatInfo;
        responce.is_success = true;
        responce.log = 'Groupe chat created successfully';
      } else {
        responce.log = 'Groupe chat is exist';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Update private chat service
  async updateGroupeChat(groupe_chatInfo: Groupe_chat): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass(groupe_chatInfo, groupeChatPutSchema);

    if (pass.is_success) {
      const groupe_chat: Groupe_chat = (await this.getGroupeChat(groupe_chatInfo.id)).data;

      if (!isEmpty(groupe_chat)) {
        await prisma.groupe_chat.update({
          where: {
            id: groupe_chatInfo.id,
          },
          data:groupe_chatInfo
        });
        responce.is_success = true;
        responce.log = 'Groupe chat updated successfully';
      } else {
        responce.log = 'Groupe chat not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Delete private chat service
  async deleteGroupeChat(id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ id }, groupeChatDeleteSchema);

    if (pass.is_success) {
      const groupe_chat: Groupe_chat = (await this.getGroupeChat(id)).data;

      if (!isEmpty(groupe_chat)) {
        await prisma.groupe_chat.delete({
          where: {
            id: id,
          },
        });
        responce.is_success = true;
        responce.log = 'Groupe chat deleted successfully';
      } else {
        responce.log = 'Groupe chat not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }
}
