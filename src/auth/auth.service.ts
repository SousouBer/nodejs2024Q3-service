import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/models/create-user.dto';
import { DatabaseService } from '../database/database.service';
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService) {}

  async signup(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      +process.env.CRYPT_SALT,
    );

    const user = await this.databaseService.user.create({
      data: { login: createUserDto.login, password: hashPassword },
    });

    return user;
  }
}
