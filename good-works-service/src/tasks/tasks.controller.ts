import { Controller } from '@nestjs/common';
import { Tasks } from 'src/entities/tasks.entity';
import { TasksService } from './tasks.service';
import { Crud, CrudController } from '@dataui/crud';

@Crud({model: {type: Tasks}})
@Controller('tasks')
export class TasksController implements CrudController<Tasks> {
    constructor(public service: TasksService) {}
}
