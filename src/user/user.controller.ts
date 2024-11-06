import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/user.model';
import { CreateUserDto } from 'src/models/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.userService.createUser(createUserDto);
  }
}
