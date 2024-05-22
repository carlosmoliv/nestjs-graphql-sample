import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSetting } from './user-setting';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field({ nullable: true })
  displayName?: string;

  @OneToOne(() => UserSetting, { cascade: true })
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSetting;
}
