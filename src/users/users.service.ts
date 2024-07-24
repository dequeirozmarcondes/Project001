import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly users: CreateUserDto[] = [];
  constructor() {
    // Adicionando um usuário de teste
    this.users.push({
      id: '1',
      username: 'admin',
      password: 'admin',
    });
  }

  create(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    console.log(this.users);
    return createUserDto;
  }

  //metodo para retorno do usuário
  findByUserName(username: string): CreateUserDto | null {
    return this.users.find((user) => user.username === username) || null;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
