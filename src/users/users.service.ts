import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User as PrismaUser } from '@prisma/client';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<PrismaUser> {
    const existingUser = await this.findOne(createUserDto.username);
    if (existingUser) {
      throw new ConflictException(
        `User '${createUserDto.username}' already exists`,
      );
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    // Cria um novo usuário no banco de dados usando Prisma
    const newUser = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  async validatePassword(
    username: string,
    password: string,
  ): Promise<PrismaUser | null> {
    console.log('Validating password for username:', username);

    const user = await this.findOne(username);
    console.log('User found for validation:', user);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async findOne(username: string): Promise<PrismaUser | null> {
    console.log('Finding user with username:', username);

    // Busca um usuário no banco de dados usando Prisma
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    console.log('Found user:', user);
    return user || null; // Retorna null se o usuário não for encontrado
  }
}
