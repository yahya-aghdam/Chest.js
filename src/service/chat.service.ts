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
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  private chat = new MongoGenericRepository(this.chatModel);
  private user = new MongoGenericRepository(this.userModel);

  //ANCHOR - Get private chat info service
  async getChat(custom_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass: CheckResult = await check_pass({ custom_id }, chatGetSchema);

    if (pass.is_success) {
      const findedChat: Chat[] = await this.chat.get(custom_id);

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

      const chats: any = [];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [index, item] of user_chat_list.entries()) {
        const findedChat: Chat[] = await this.chat.getAllBy(
          'chat_room_id',
          item,
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [index, item] of findedChat.entries()) {
          item.is_notified = true;
          await this.chat.update(item.custom_id, item);
        }
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

      //update users chat list
      const senderUserInfo: User = await this.user.get(
        chatInfo.sender_custom_id,
      );
      if (!senderUserInfo.chats_id_list.includes(chatInfo.chat_room_id)) {
        senderUserInfo.chats_id_list.push(chatInfo.chat_room_id);
        await this.user.update(chatInfo.sender_custom_id, senderUserInfo);
      }

      const reciverUserInfo: User = await this.user.get(
        chatInfo.reciver_custom_id,
      );
      if (!reciverUserInfo.chats_id_list.includes(chatInfo.chat_room_id)) {
        reciverUserInfo.chats_id_list.push(chatInfo.chat_room_id);
        await this.user.update(chatInfo.sender_custom_id, reciverUserInfo);
      }

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

        //update users chat list
        const senderUserInfo: User = await this.user.get(
          findedChat.sender_custom_id,
        );
        senderUserInfo.chats_id_list = senderUserInfo.chats_id_list.filter(
          (item) => item !== custom_id,
        );
        await this.user.update(findedChat.sender_custom_id, senderUserInfo);

        const reciverUserInfo: User = await this.user.get(
          findedChat.reciver_custom_id,
        );
        reciverUserInfo.chats_id_list = reciverUserInfo.chats_id_list.filter(
          (item) => item !== custom_id,
        );
        await this.user.update(findedChat.sender_custom_id, reciverUserInfo);

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
