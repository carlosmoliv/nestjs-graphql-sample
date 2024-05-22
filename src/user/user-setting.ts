import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_settings')
@ObjectType()
export class UserSetting {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
