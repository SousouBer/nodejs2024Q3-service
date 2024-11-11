import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from 'src/models/create-user.dto';
import { User } from 'src/models/user.model';
import { UpdatePasswordDto } from 'src/models/update-password.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll(): Partial<User>[] {
    return this.users.map((user) => {
      return this.removePasswordFromUser(user);
    });
  }

  findOne(id: string): Partial<User> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist`);
    }

    return user;

    // return this.removePasswordFromUser(user);
  }

  createUser(createUserDto: CreateUserDto): Partial<User> {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      version: 1,
      password: createUserDto.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);

    return this.removePasswordFromUser(newUser);
  }

  updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Partial<User> {
    const user = this.findOne(id);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect.');
    }

    this.users = this.users.map((user) =>
      user.id === id
        ? {
            ...user,
            password: updatePasswordDto.newPassword,
            updatedAt: Date.now(),
            version: user.version + 1,
          }
        : user,
    );

    const updatedUser = this.findOne(id);

    return this.removePasswordFromUser(updatedUser);
  }

  deleteUser(id: string): void {
    this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);
  }

  private removePasswordFromUser(user: Partial<User>): Partial<User> {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }
}
