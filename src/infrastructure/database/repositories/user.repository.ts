import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserRepositoryInterface } from 'src/application/interfaces/user.repository.interface';
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

    const createdUser = await this.prisma.user.create({
      data: userData,
    });

    return new User(
      createdUser.username,
      createdUser.email,
      createdUser.password,
      createdUser.id,
      createdUser.createdAt,
      createdUser.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!foundUser) {
      return null;
    }

    return new User(
      foundUser.username,
      foundUser.email,
      foundUser.password,
      foundUser.id,
      foundUser.createdAt,
      foundUser.updatedAt,
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { username: username },
    });

    if (!foundUser) {
      return null;
    }

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
