import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersModule } from '../../../presentation/modules/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../../../presentation/controllers/auth.controller';
import { jwtConstants } from '../auth/constants';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case';
import { ValidatePasswordModule } from 'src/application/services/modules/validate-password.module';
import { PASSWORD_HASH_SERVICE } from 'src/domain/repositories/interfaces/password-hash.service.interface';
import { PasswordHashService } from 'src/infrastructure/services/password-hash.service';

@Module({
  imports: [
    UsersModule,
    ValidatePasswordModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    AuthService,
    CreateUserUseCase,
    PrismaService,
    {
      provide: PASSWORD_HASH_SERVICE,
      useClass: PasswordHashService,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
