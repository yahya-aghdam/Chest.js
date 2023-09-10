import { Injectable } from '@nestjs/common';
import ResponceT from '../interface/responce';
import check_pass from '../lib/checkers';
import {
  Private_chat,
  privateChatDeleteSchema,
  privateChatGetSchema,
  privateChatPostSchema,
} from '../schema';
import { id_generator } from '../lib/handlers';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { MongoGenericRepository } from 'src/core';
import { Model } from 'mongoose';

@Injectable()
export class PrivateChatService {
  constructor(
    @InjectModel(Private_chat.name)
    private privateChatModel: Model<Private_chat>,
  ) {}
  private privateChat = new MongoGenericRepository(this.privateChatModel);

  //ANCHOR - Get private info service
  async getPrivateChat(custom_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ custom_id }, privateChatGetSchema);

    if (pass.is_success) {
      const privateChat: Private_chat = await this.privateChat.get(custom_id);

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
      const private_chat: Private_chat[] = await this.privateChat.getAllBy(
        'persons',
        privateChatInfo.persons,
      );

      if (isEmpty(private_chat)) {
        privateChatInfo.custom_id = id_generator();
        await this.privateChat.create(privateChatInfo);

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
  async deletePrivateChat(custom_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ custom_id }, privateChatDeleteSchema);

    if (pass.is_success) {
      const private_chat: Private_chat = (await this.getPrivateChat(custom_id))
        .data;

      if (!isEmpty(private_chat)) {
        await this.privateChat.delete(custom_id)
        
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
