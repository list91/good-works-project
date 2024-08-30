import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Friends } from './entities/friends.entity';
import { Users } from './entities/users.entity';
import { Tasks } from './entities/tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsController } from './friends/friends.controller';
import { TasksController } from './tasks/tasks.controller';
import { FriendsModule } from './friends/friends.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))

    }),
    AuthModule, UsersModule, FriendsModule, TasksModule
  ],
  controllers: [AppController, FriendsController, TasksController],
  providers: [AppService],
})
export class AppModule {}

