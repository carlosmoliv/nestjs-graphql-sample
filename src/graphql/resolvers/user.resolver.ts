import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from '../models/user';
import { mockUsers } from '../../__mocks__/mock-users';
import { NotFoundException } from '@nestjs/common';
import { UserSetting } from '../models/user-setting';
import { mockUserSettings } from '../../__mocks__/mock-user-settings';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  getUserById(@Args('id', { type: () => Int }) id: number): User {
    const user = mockUsers.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  @Query(() => [User])
  getAllUsers(): User[] {
    return mockUsers;
  }

  @ResolveField(() => UserSetting)
  settings(@Parent() user: User): UserSetting {
    return mockUserSettings.find((setting) => setting.userId === user.id);
  }
}
