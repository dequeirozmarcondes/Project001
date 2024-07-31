import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../presentation/modules/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';

import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case';
import { HashService } from 'src/application/services/hash-password';
import { ValidatePasswordModule } from 'src/application/services/modules/validate-password.module';

@Module({
  imports: [
    UsersModule,
    ValidatePasswordModule, // Importa o módulo de usuários
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' }, // Tempo de expiração do token
    }),
  ],
  providers: [AuthService, CreateUserUseCase, PrismaService, HashService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
