import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Verifica se o usuário já existe pelo e-mail
      const existingUserEmail = await this.prisma.user.findUnique({
        where: { email: createUserDto.username },
      });

      if (existingUserEmail) {
        throw new ConflictException(
          `User '${createUserDto.username}' already exists`,
        );
      }

      // Verifica se o usuário já existe pelo nome
      const existingUserName = await this.prisma.user.findUnique({
        where: { username: createUserDto.username },
      });

      if (existingUserName) {
        throw new ConflictException(
          `User '${createUserDto.username}' already exists`,
        );
      }

      // Hasheia a senha fornecida
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );

      // Cria um novo usuário no banco de dados usando Prisma
      const newUser = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: hashedPassword,
          username: createUserDto.username,
        },
      });

      // Retorna a entidade User criada
      return new User(
        newUser.username,
        newUser.email,
        newUser.password,
        newUser.id,
        newUser.createdAt,
        newUser.updatedAt,
      );
    } catch (error) {
      throw new ConflictException('An error occurred while creating the user.');
    }
  }

  async validatePassword(name: string, password: string): Promise<User | null> {
    try {
      // Busca o usuário pelo e-mail
      const user = await this.prisma.user.findUnique({
        where: { username: name },
      });

      // Compara a senha fornecida com a senha armazenada
      if (user && (await bcrypt.compare(password, user.password))) {
        return new User(
          user.username,
          user.email,
          user.password,
          user.id,
          user.createdAt,
          user.updatedAt,
        );
      }

      return null;
    } catch (error) {
      throw new ConflictException(
        'An error occurred while validating the password.',
      );
    }
  }

  async findOne(name: string): Promise<User | null> {
    try {
      // Busca um usuário no banco de dados usando Prisma
      const user = await this.prisma.user.findUnique({
        where: { username: name },
      });

      if (!user) {
        return null;
      }

      // Retorna a entidade User correspondente
      return new User(
        user.username,
        user.email,
        user.password,
        user.id,
        user.createdAt,
        user.updatedAt,
      );
    } catch (error) {
      throw new ConflictException('An error occurred while finding the user.');
    }
  }
}
