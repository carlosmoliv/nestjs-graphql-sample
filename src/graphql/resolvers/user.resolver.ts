import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { User } from '../models/user';
import { mockUsers } from '../../__mocks__/mock-users';
import { NotFoundException } from '@nestjs/common';
import { UserSetting } from '../models/user-setting';
import { mockUserSettings } from '../../__mocks__/mock-user-settings';
import { CreateUserInput } from './create-user.input';
import { AddSettingsInput } from './add-settings.input';

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

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput): User {
    const newUser = { id: this.getNextId(), ...input };
    mockUsers.push(newUser);
    return newUser;
  }

  @Mutation(() => UserSetting)
  addSettings(@Args('input') input: AddSettingsInput): UserSetting {
    this.getUserById(input.userId);
    mockUserSettings.push(input);
    return input;
  }

  private getNextId() {
    return mockUsers.length > 0
      ? Math.max(...mockUsers.map((user) => user.id)) + 1
      : 1;
  }
}
