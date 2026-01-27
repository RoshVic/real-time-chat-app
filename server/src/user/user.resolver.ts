import { Query, Resolver } from '@nestjs/graphql';
import { UserRole, type User } from '@prisma/client';

import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Query(() => UserModel, {
    name: 'getOneUser',
  })
  getMe(@Authorized() user: User) {
    return user;
  }

  @Authorization(UserRole.ADMIN)
  @Query(() => [UserModel], {
    name: 'getAllUsers',
    description: 'This is a method to get all user data',
  })
  getUsers() {
    return this.userService.findAll();
  }
}
