import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends } from 'src/entities/friends.entity';
import { Users } from 'src/entities/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Friends, Users])],
    providers: [FriendsService],
    exports: [FriendsService],
    controllers: [FriendsController],})
export class FriendsModule {}
