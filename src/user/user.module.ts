import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { UserSetting } from './user-setting';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
