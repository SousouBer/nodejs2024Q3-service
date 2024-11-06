import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from 'src/models/create-user.dto';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 'string',
      login: 'string',
      password: 'string',
      version: 5,
      createdAt: 10,
      updatedAt: 10,
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist`);
    }

    return user;
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      version: 5,
      password: createUserDto.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);
    return newUser;
  }
}
