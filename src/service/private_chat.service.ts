import { Injectable } from '@nestjs/common';
import ResponceT from '../interface/responce';
import { Private_chat } from '@prisma/client';
import check_pass from '../lib/checkers';
import {
  privateChatDeleteSchema,
  privateChatGetSchema,
  privateChatPostSchema,
} from '../schema';
import prisma from '../lib/prisma';
import { id_generator } from '../lib/handlers';
import { isEmpty } from 'lodash';

@Injectable()
export class PrivateChatService {
  //ANCHOR - Get private info service
  async getPrivateChat(id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ id }, privateChatGetSchema);

    if (pass.is_success) {
      const privateChat: Private_chat = (await prisma.private_chat.findUnique({
        where: {
          id: id,
        },
      })) as Private_chat;

      if (!isEmpty(privateChat)) {
        responce.data = privateChat;
        responce.is_success = true;
        responce.log = 'Private chat finded successfully';
      } else {
        responce.log = 'Private chat not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Create private service
  async createPrivateChat(privateChatInfo: Private_chat): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass(privateChatInfo, privateChatPostSchema);

    if (pass.is_success) {
      const private_chat: Private_chat[] = (await prisma.private_chat.findMany({
        where: {
          persons: { equals: privateChatInfo.persons },
        },
      })) as Private_chat[];

      if (isEmpty(private_chat)) {
        privateChatInfo.id = id_generator();
        await prisma.private_chat.create({
          data: privateChatInfo,
        });

        responce.data = privateChatInfo;
        responce.is_success = true;
        responce.log = 'Private chat created successfully';
      } else {
        responce.log = 'Private chat is exist';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Delete usre service
  async deletePrivateChat(id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ id }, privateChatDeleteSchema);

    if (pass.is_success) {
      const private_chat: Private_chat = (await this.getPrivateChat(id))
        .data;

      if (!isEmpty(private_chat)) {
        await prisma.private_chat.delete({
          where: {
            id: id,
          },
        });
        responce.is_success = true;
        responce.log = 'Private chat deleted successfully';
      } else {
        responce.log = 'Private chat not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }
}
