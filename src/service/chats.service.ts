import { Injectable } from '@nestjs/common';
import ResponceT from '../interface/responce';
import { Chats, User } from '@prisma/client';
import check_pass from '../lib/checkers';
import {
  chatsDeleteSchema,
  chatsGetAllSchema,
  chatsGetSchema,
  chatsPostSchema,
  chatsPutSchema,
} from '../schema';
import prisma from '../lib/prisma';
import { id_generator } from '../lib/handlers';
import { isEmpty } from 'lodash';

@Injectable()
export class ChatsService {
  //ANCHOR - Get private chat info service
  async getChats(chat_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ chat_id }, chatsGetSchema);

    if (pass.is_success) {
      const chats: Chats[] = (await prisma.chats.findMany({
        where: {
          chat_id: chat_id,
        },
        orderBy: {
          id: 'desc',
        },
        take: 20,
      })) as Chats[];

      if (!isEmpty(chats)) {
        responce.data = chats;
        responce.is_success = true;
        responce.log = 'Chats finded successfully';
      } else {
        responce.log = 'Chats not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Get private chat info service
  async getAllChatsOfAUser(unique_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ unique_id }, chatsGetAllSchema);

    if (pass.is_success) {
      const user: User = (await prisma.user.findUnique({
        where: {
          unique_id: unique_id,
        },
      })) as User;

      const user_chats_list = JSON.parse(user.chats.replace(/'/g, '"'));

      let chats: Chats[];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [index, item] of user_chats_list.entries()) {
        const chat: Chats = (await this.getChats(item)).data;
        chats.push(chat);
      }

      responce.is_success = true;
      responce.log = 'All cahts finded successfully';
      responce.data = chats;
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Create private chat service
  async createChats(chatsInfo: Chats): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass(chatsInfo, chatsPostSchema);

    if (pass.is_success) {
      chatsInfo.unique_id = id_generator();
      chatsInfo.time_stamp = JSON.stringify(Date.now());

      await prisma.chats.create({
        data: chatsInfo,
      });



      responce.data = chatsInfo;
      responce.is_success = true;
      responce.log = 'Chats created successfully';
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Update private chat service
  async updateChats(chatsInfo: Chats): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass(chatsInfo, chatsPutSchema);

    if (pass.is_success) {
      const chats: Chats = await prisma.chats.findUnique({
        where: {
          unique_id: chatsInfo.unique_id,
        },
      });

      if (!isEmpty(chats)) {
        await prisma.chats.update({
          where: {
            unique_id: chatsInfo.unique_id,
          },
          data: chatsInfo,
        });
        responce.is_success = true;
        responce.log = 'Chats updated successfully';
      } else {
        responce.log = 'Chats not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Delete private chat service
  async deleteChats(unique_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ unique_id }, chatsDeleteSchema);

    if (pass.is_success) {
      const chats: Chats = await prisma.chats.findUnique({
        where: {
          unique_id: unique_id,
        },
      });

      if (!isEmpty(chats)) {
        await prisma.chats.delete({
          where: {
            unique_id: unique_id,
          },
        });
        responce.is_success = true;
        responce.log = 'Chats deleted successfully';
      } else {
        responce.log = 'Chats not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }
}
