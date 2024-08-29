import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Tasks } from 'src/entities/tasks.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tasks])],
    providers: [TasksService],
    exports: [TasksService],
    controllers: [TasksController],})
export class TasksModule {}
