import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from 'src/models/user.model';
import { CreateUserDto } from 'src/models/create-user.dto';

import { ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { UpdatePasswordDto } from 'src/models/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): Promise<Partial<User>[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string): Promise<Partial<User>> {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ): Promise<Partial<User>> {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  removeUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
