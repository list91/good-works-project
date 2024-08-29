import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
): Promise<{ access_token: string, userid: number }> {
    const user = await this.usersService.findByUsername(username);
    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: user.id, username: user.username };
    return {
        access_token: await this.jwtService.signAsync(payload),
        userid: user.id 
    };
}


  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.pass, 10);
    const userWithHashedPassword = { ...createUserDto, pass: hashedPassword };
    return await this.usersService.create(userWithHashedPassword);

  }
}
