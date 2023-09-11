import { Injectable } from '@nestjs/common';
import ResponceT from '../interface/responce';
import check_pass from '../lib/checkers';
import {
  Chat,
  User,
  chatDeleteSchema,
  chatGetAllSchema,
  chatGetSchema,
  chatPostSchema,
  chatPutSchema,
} from '../schema';
import { id_generator } from '../lib/handlers';
import { isEmpty } from 'lodash';
import { MongoGenericRepository } from 'src/model';
import { Model } from 'mongoose';
import { CheckResult } from 'src/interface/checkResult';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Chat.name) private userModel: Model<User>,
  ) {}
  private chat = new MongoGenericRepository(this.chatModel);
  private user = new MongoGenericRepository(this.userModel);

  //ANCHOR - Get private chat info service
  async getChat(chat_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass: CheckResult = await check_pass({ chat_id }, chatGetSchema);

    if (pass.is_success) {
      const findedChat: Chat[] = await this.chat.getAllBy('chat_id', chat_id);

      if (!isEmpty(findedChat)) {
        responce.data = findedChat;
        responce.is_success = true;
        responce.log = 'Chat finded successfully';
      } else {
        responce.log = 'Chat not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Get private chat info service
  async getAllChatsOfAUser(custom_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass: CheckResult = await check_pass({ custom_id }, chatGetAllSchema);

    if (pass.is_success) {
      const findedUser: User = await this.user.get(custom_id);

      const user_chat_list: string[] = findedUser.chats_id_list;

      let chats: Chat[];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [index, item] of user_chat_list.entries()) {
        const findedChat: Chat = (await this.getChat(item)).data;
        chats.push(findedChat);
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
  async createChat(chatInfo: Chat): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass: CheckResult = await check_pass(chatInfo, chatPostSchema);

    if (pass.is_success) {
      chatInfo.custom_id = id_generator();
      chatInfo.time_stamp = JSON.stringify(Date.now());

      await this.chat.create(chatInfo);

      responce.data = chatInfo;
      responce.is_success = true;
      responce.log = 'Chat created successfully';
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Update private chat service
  async updateChat(chatInfo: Chat): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass: CheckResult = await check_pass(chatInfo, chatPutSchema);

    if (pass.is_success) {
      const findedChat: Chat = (await this.getChat(chatInfo.custom_id)).data;

      if (!isEmpty(findedChat)) {
        await this.chat.update(chatInfo.custom_id, chatInfo);

        responce.is_success = true;
        responce.log = 'Chat updated successfully';
      } else {
        responce.log = 'Chat not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Delete private chat service
  async deleteChat(custom_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ custom_id }, chatDeleteSchema);

    if (pass.is_success) {
      const findedChat: Chat = (await this.getChat(custom_id)).data;

      if (!isEmpty(findedChat)) {
        await this.chat.delete(custom_id);

        responce.is_success = true;
        responce.log = 'Chat deleted successfully';
      } else {
        responce.log = 'Chat not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }
}
