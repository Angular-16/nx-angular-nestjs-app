import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser, UpdateUser, User } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  allUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUniqueUser(@Param('id') id: string): User {
    return this.userService.getUniqueUser(Number(id));
  }

  @Post()
  createUser(@Body() createUser: CreateUser): User {
    return this.userService.createUser(createUser);
  }

  @Put(':id')
  updateUser(@Body() updateUser: UpdateUser, @Param('id') id: string): User {
    return this.userService.updateUser(updateUser, Number(id));
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): User {
    return this.userService.deleteUser(Number(id));
  }
}
