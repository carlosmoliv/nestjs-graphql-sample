import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { User } from '../models/user';
import { mockUsers } from '../../__mocks__/mock-users';

@Resolver()
export class UserResolver {
  @Query(() => User)
  getUserById(@Args('id', { type: () => Int }) id: number): User {
    return mockUsers.find((user) => user.id === id);
  }
}
