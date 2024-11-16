import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from 'src/models/create-user.dto';
import { User } from 'src/models/user.model';
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

  async getUsers(): Promise<Partial<User>[]> {
    return this.databaseService.user.findMany({
      select: userFields,
    });
  }

  async getUser(id: string): Promise<Partial<User>> {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
      select: userFields,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Partial<User>> {
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

    return updatedUser;
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
}
