import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/models/create-user.dto';
import { DatabaseService } from '../database/database.service';
import { User } from 'src/models/user.model';
import { AuthPayload, AuthTokens } from './models/tokens.model';
import { decode } from 'jsonwebtoken';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

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

  async login(loginUserDto: CreateUserDto): Promise<AuthPayload & AuthTokens> {
    const { login, password } = loginUserDto;

    const user = await this.databaseService.user.findFirst({
      where: { login },
    });

    if (!user) {
      throw new NotFoundException('User with provided login does not exist');
    }

    const PasswordsMatch = await bcrypt.compare(password, user.password);

    if (!PasswordsMatch) {
      throw new NotFoundException('Provided password is incorrect');
    }

    const payload = { userId: user.id, login: user.login };
    const tokens = await this.generateTokens(payload);

    return { ...payload, ...tokens };
  }

  async refresh({
    refreshToken,
  }: CreateRefreshTokenDto): Promise<AuthPayload & AuthTokens> {
    try {
      await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
    } catch {
      throw new ForbiddenException('Refresh token is invalid');
    }

    const { userId, login } = decode(refreshToken) as AuthPayload;

    const newTokens = await this.generateTokens({ userId, login });

    return { userId, login, ...newTokens };
  }

  private async generateTokens(payload: AuthPayload): Promise<AuthTokens> {
    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }
}
