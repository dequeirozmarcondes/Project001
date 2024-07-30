import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../presentation/modules/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';

import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, CreateUserUseCase, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
