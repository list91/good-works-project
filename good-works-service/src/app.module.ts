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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin', 
      password: 'admin',
      database: 'gwdb',
      entities: [Friends, Users, Tasks],
      migrations: ["dist/migrations/*{.ts,.js}"],
      synchronize: true,
      
    }),
    AuthModule, UsersModule, FriendsModule, TasksModule],
  controllers: [AppController, FriendsController, TasksController],
  providers: [AppService],
})
export class AppModule {}
