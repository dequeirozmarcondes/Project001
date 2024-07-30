import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case';
import { UsersController } from '../controllers/users.controller';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import { USER_REPOSITORY_TOKEN } from 'src/application/tokens'; // Importe o token

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    PrismaService,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
  ],
  exports: [CreateUserUseCase, USER_REPOSITORY_TOKEN], // Exporte o token se necessário em outros módulos
})
export class UsersModule {}
