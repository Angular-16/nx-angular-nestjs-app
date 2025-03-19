import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUser, UpdateUser, User } from './dto';

@Injectable()
export class UserService {
  private count = 0;
  users: User[] = [];

  getAllUsers(): User[] {
    return [...this.users];
  }

  getUniqueUser(id: number): User {
    const user = this.users.find((user: User) => user.id === id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  createUser(createUser: CreateUser): User {
    const newUser: User = {
      ...createUser,
      id: (this.count += 1),
    };
    this.users.push(newUser);

    return newUser;
  }

  updateUser(updateUser: UpdateUser, id: number): User {
    let user = this.users.find((user: User) => user.id === id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    user = {
      ...user,
      name: updateUser?.name,
      email: updateUser?.email,
    };

    return user;
  }

  deleteUser(id: number): User {
    const user = this.users.find((user: User) => user.id === id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    this.users = this.users.filter((user: User) => user.id === id);

    return user;
  }
}
