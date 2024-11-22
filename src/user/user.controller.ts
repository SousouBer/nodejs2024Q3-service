import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserWithoutPassword } from 'src/models/user.model';
import { CreateUserDto } from 'src/models/create-user.dto';

import { ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { UpdatePasswordDto } from 'src/models/update-password.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  getUsers(): Promise<UserWithoutPassword[]> {
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserWithoutPassword> {
    return this.userService.getUser(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserWithoutPassword> {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
