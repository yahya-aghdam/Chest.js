import { Injectable } from '@nestjs/common';
import ResponceT from '../interface/responce';
import check_pass from '../lib/checkers';
import {
  User,
  userDeleteSchema,
  userGetSchema,
  userPostSchema,
  userPutSchema,
} from '../schema';
import { id_generator } from '../lib/handlers';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/core';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private user = new MongoGenericRepository(this.userModel);

  //ANCHOR - Get user info service
  async getUser(custom_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ custom_id }, userGetSchema);

    if (pass.is_success) {
      const findedUser: User = await this.user.get(custom_id);

      if (!isEmpty(findedUser)) {
        responce.data = findedUser;
        responce.is_success = true;
        responce.log = 'User finded successfully';
      } else {
        responce.log = 'User not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Create user service
  async createUser(userInfo: User): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass(userInfo, userPostSchema);

    if (pass.is_success) {
      const findedUser:User = await this.user.getOneBy("username", userInfo.username)

      if (isEmpty(findedUser)) {
        userInfo.custom_id = id_generator();

        await this.user.create(userInfo)

        responce.is_success = true;
        responce.log = 'User created successfully';
      } else {
        responce.is_success = false;
        responce.log = 'Username is used before';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Update usre service
  async updateUser(userInfo: User): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass(userInfo, userPutSchema);

    if (pass.is_success) {
      const user = (await this.getUser(userInfo.custom_id)).data;
      if (!isEmpty(user)) {
        await this.user.update(userInfo.custom_id,userInfo)

        responce.is_success = true;
        responce.log = 'User updated successfully';
      } else {
        responce.log = 'User not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }

  //ANCHOR - Delete usre service
  async deleteUser(custom_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ custom_id }, userDeleteSchema);

    if (pass.is_success) {
      const user = (await this.getUser(custom_id)).data;

      if (!isEmpty(user)) {
        await this.user.delete(custom_id)

        responce.is_success = true;
        responce.log = 'User deleted successfully';
      } else {
        responce.log = 'User not found';
      }
    } else {
      responce.log = pass.log;
    }

    return responce;
  }
}
