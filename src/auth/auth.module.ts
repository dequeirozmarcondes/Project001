import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<string>('JWT_EXPIRATION_TIME');

        if (!secret) {
          throw new Error('JWT_SECRET não está definido na configuração');
        }

        if (!expiresIn) {
          throw new Error(
            'JWT_EXPIRATION_TIME não está definido na configuração',
          );
        }

        return {
          secret,
          signOptions: {
            expiresIn: Number(expiresIn), // Conversão explícita para número
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
