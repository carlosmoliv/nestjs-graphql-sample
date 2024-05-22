import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './user/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'src/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: 'localhost',
      username: 'root',
      password: 'pass123',
      database: 'nest_graphql_sample',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
