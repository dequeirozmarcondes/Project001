import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserRepositoryInterface } from 'src/domain/repositories/interfaces/user.repository.interface';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const userData = {
      email: user.email,
      password: user.password,
      username: user.username,
    };

    // Cria o usuário no banco de dados
    const createdUser = await this.prisma.user.create({
      data: userData,
    });

    // Retorna o usuário criado
    return new User(
      createdUser.username,
      createdUser.email,
      createdUser.password,
      createdUser.id,
      createdUser.createdAt,
      createdUser.updatedAt,
    );
  }

  // Encontra um usuário pelo email
  async findByEmail(email: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!foundUser) {
      return null;
    }

    // Retorna o usuário encontrado
    return new User(
      foundUser.username,
      foundUser.email,
      foundUser.password,
      foundUser.id,
      foundUser.createdAt,
      foundUser.updatedAt,
    );
  }

  // Encontra um usuário pelo nome de usuário
  async findByUsername(username: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { username: username },
    });

    if (!foundUser) {
      return null;
    }

    // Retorna o usuário encontrado
    return new User(
      foundUser.username,
      foundUser.email,
      foundUser.password,
      foundUser.id,
      foundUser.createdAt,
      foundUser.updatedAt,
    );
  }
}
