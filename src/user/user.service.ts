import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user';
import { Repository } from 'typeorm';
import { CreateUserInput } from './inputs/create-user.input';
import { Args } from '@nestjs/graphql';
import { AddSettingsInput } from './inputs/add-settings.input';
import { UserSetting } from './user-setting';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserSetting)
    private userSettingsRepository: Repository<UserSetting>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(input: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(input);
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['settings'],
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async addSettings(@Args('input') input: AddSettingsInput): Promise<User> {
    const { userId, ...settingsData } = input;
    const user = await this.findOne(userId);
    if (user.settings) {
      this.userSettingsRepository.merge(user.settings, settingsData);
    } else {
      user.settings = this.userSettingsRepository.create(settingsData);
    }
    return this.userRepository.save(user);
  }
}
