import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from 'src/entities/tasks.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class TasksService extends TypeOrmCrudService<Tasks> {
    constructor(
        @InjectRepository(Tasks)
        private tasksRepository: Repository<Tasks>,
    ) {
        super(tasksRepository);
    }
    
    async getAllTasks(): Promise<Tasks[]> {
        return this.tasksRepository.find();
    }

}
