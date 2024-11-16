import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from 'src/models/create-user.dto';
import { UserWithoutPassword } from 'src/models/user.model';
import { UpdatePasswordDto } from 'src/models/update-password.dto';
import { DatabaseService } from 'src/database/database.service';

const userFields = {
  id: true,
  login: true,
  version: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUsers(): Promise<UserWithoutPassword[]> {
    const users = await this.databaseService.user.findMany({
      select: userFields,
    });

    return users.map((user) => this.convertDateToNumber(user));
  }

  async getUser(id: string): Promise<UserWithoutPassword> {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
      select: userFields,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist`);
    }

    return this.convertDateToNumber(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const createdUser = await this.databaseService.user.create({
      data: createUserDto,
      select: userFields,
    });

    return this.convertDateToNumber(createdUser);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserWithoutPassword> {
    const user = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist`);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect.');
    }

    const updatedUser = await this.databaseService.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: user.version + 1,
      },
      select: userFields,
    });

    return this.convertDateToNumber(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.databaseService.user.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`User with ID ${id} does not exist`);
    }
  }

  private convertDateToNumber(user): UserWithoutPassword {
    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }
}
