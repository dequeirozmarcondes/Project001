import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '../../domain/repositories/interfaces/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from 'src/application/tokens'; // Importe o token
import { PasswordHashService } from '../../infrastructure/services/password-hash.service'; // Importe o serviço de hash
import { ValidatePasswordService } from '../services/auth/validate-password'; // Importe o serviço de validação de senha

const saltOrRounds = 10;

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashService: PasswordHashService, // Injete o serviço de hash
    private readonly validatePasswordService: ValidatePasswordService, // Injete o serviço de validação de senha
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      /// Verifica se o usuário já existe pelo email
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

      //Service de hash password
      const hashedPassword = await this.hashService.hashPassword(
        createUserDto.password,
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
      // Usa o ValidatePasswordService para validar a senha
      const isPasswordValid =
        await this.validatePasswordService.validatePassword(username, password);

      if (isPasswordValid) {
        return await this.userRepository.findByUsername(username);
      }

      return null;
    } catch (error) {
      throw new ConflictException(
        'An error occurred while validating the password.',
      );
    }
  }
}
