
import { CrudService } from '@dataui/crud';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/create-user.dto';
import { Users } from 'src/entities/users.entity';
import { FindOneOptions, Repository } from 'typeorm';

export type User = any;

@Injectable()
export class UsersService extends TypeOrmCrudService<Users> {

  constructor(

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

  ) {
    super(userRepository);
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<Users> {
    return this.userRepository.findOne({ where: { username } });
  }
  
  async getAllUsers(): Promise<Users[]> {
    return this.userRepository.find();
}
}
