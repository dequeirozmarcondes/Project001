import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '../../application/interfaces/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from 'src/application/tokens'; // Importe o token

const saltOrRounds = 10;

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Verifica se o usuário já existe pelo e-mail
      const existingUserEmail = await this.userRepository.findByEmail(
        createUserDto.email,
      );

      if (existingUserEmail) {
        throw new ConflictException(
          `User with email '${createUserDto.email}' already exists`,
        );
      }

      // Verifica se o usuário já existe pelo nome
      const existingUserName = await this.userRepository.findByUsername(
        createUserDto.username,
      );

      if (existingUserName) {
        throw new ConflictException(
          `User with username '${createUserDto.username}' already exists`,
        );
      }

      // Hasheia a senha fornecida
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );

      // Cria um novo usuário
      const newUser = new User(
        createUserDto.username,
        createUserDto.email,
        hashedPassword,
      );

      // Persiste o novo usuário usando o repositório
      const createdUser = await this.userRepository.create(newUser);

      // Retorna a entidade User criada
      return createdUser;
    } catch (error) {
      throw new ConflictException('An error occurred while creating the user.');
    }
  }

  async validatePassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    try {
      // Busca o usuário pelo nome de usuário
      const user = await this.userRepository.findByUsername(username);

      // Compara a senha fornecida com a senha armazenada
      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      }

      return null;
    } catch (error) {
      throw new ConflictException(
        'An error occurred while validating the password.',
      );
    }
  }
}
