import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { User } from './user';
import { mockUsers } from '../__mocks__/mock-users';
import { UserSetting } from './user-setting';
import { mockUserSettings } from '../__mocks__/mock-user-settings';
import { CreateUserInput } from './inputs/create-user.input';
import { AddSettingsInput } from './inputs/add-settings.input';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  getUserById(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Query(() => [User])
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  // @ResolveField(() => UserSetting)
  // settings(@Parent() user: User): UserSetting {
  //   return mockUserSettings.find((setting) => setting.userId === user.id);
  // }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  addSettings(@Args('input') input: AddSettingsInput): Promise<User> {
    return this.userService.addSettings(input);
  }
}
