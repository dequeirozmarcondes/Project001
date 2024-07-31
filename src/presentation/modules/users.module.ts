import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case';
import { UsersController } from '../controllers/users.controller';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import { USER_REPOSITORY_TOKEN } from 'src/application/tokens'; // Token de injeção
import { PasswordHashService } from 'src/infrastructure/services/password-hash.service';
import { ValidatePasswordModule } from 'src/application/services/modules/validate-password.module';

@Module({
  imports: [ValidatePasswordModule], // Importa o módulo de validação de senha
  controllers: [UsersController], // Define os controladores
  providers: [
    CreateUserUseCase, // Caso de uso para criação de usuários
    PrismaService, // Serviço Prisma para interações com o banco de dados
    PasswordHashService, // Serviço para hashing de senhas
    {
      provide: USER_REPOSITORY_TOKEN, // Define a implementação do repositório de usuários
      useClass: UserRepository,
    },
  ],
  exports: [CreateUserUseCase, USER_REPOSITORY_TOKEN], // Exporta o caso de uso e token do repositório
})
export class UsersModule {}
