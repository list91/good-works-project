import { Controller } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { UsersService } from './users.service';
import { Crud, CrudController } from '@dataui/crud';

@Crud({model: {type: Users}})
@Controller('users')
export class UsersController implements CrudController<Users> {
    constructor(public service: UsersService) {}
}
