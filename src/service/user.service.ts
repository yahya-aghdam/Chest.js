import { Injectable } from '@nestjs/common';
import ResponceT from '../interface/responce';
import { User } from '@prisma/client';
import check_pass from '../lib/checkers';
import {
  userDeleteSchema,
  userGetSchema,
  userPostSchema,
  userPutSchema,
} from '../schema/user.schema';
import prisma from '../lib/prisma';
import { id_generator } from '../lib/handlers';
import { isEmpty } from 'lodash';

@Injectable()
export class UserService {
  //ANCHOR - Get user info service
  async getUser(unique_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({ unique_id }, userGetSchema);

    if (pass.is_success) {
      const user: User = (await prisma.user.findUnique({
        where: {
          unique_id: unique_id,
        },
      })) as User;

      if (!isEmpty(user)) {
        responce.data = user;
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
      const user = await prisma.user.findUnique({
        where: {
          username: userInfo.username,
        },
      });

      if (isEmpty(user)) {
        userInfo.unique_id = id_generator();

        await prisma.user.create({
          data: userInfo,
        });

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
      const user = await this.getUser(userInfo.unique_id);
      if (!isEmpty(user)) {
        await prisma.user.update({
          where: {
            unique_id: userInfo.unique_id,
          },
          data: userInfo,
        });

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
  async deleteUser(unique_id: string): Promise<ResponceT> {
    const responce: ResponceT = {
      is_success: false,
      log: undefined,
    };

    const pass = await check_pass({unique_id}, userDeleteSchema);

    if (pass.is_success) {
      const user = await this.getUser(unique_id);

      if (!isEmpty(user)) {
        await prisma.user.delete({
          where: {
            unique_id: unique_id,
          },
        });

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
