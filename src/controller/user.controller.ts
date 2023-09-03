import { Body, Controller, Delete, Get,Param,Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import ResponceT from 'src/interface/responce';
import { User } from '@prisma/client';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async getUser(@Param("id") id: string): Promise<ResponceT> {
    return await this.userService.getUser(id)
  }

  @Post()
  async createUser(@Body() user:User): Promise<ResponceT> {
    return await this.userService.createUser(user)
  }

  @Put()
  async updateUser(@Body() user:User): Promise<ResponceT> {
    return await this.userService.updateUser(user)
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<ResponceT> {
    return await this.userService.deleteUser(id)
  }
}
