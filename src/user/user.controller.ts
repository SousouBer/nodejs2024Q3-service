import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from 'src/models/user.model';
import { CreateUserDto } from 'src/models/create-user.dto';

import { ValidationPipe, ParseUUIDPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): User {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): User {
    return this.userService.createUser(createUserDto);
  }
}
