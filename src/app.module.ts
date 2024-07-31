import { Module } from '@nestjs/common';
import { AuthModule } from './application/services/modules/auth.module';
import { UsersModule } from './presentation/modules/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Configurações de ambiente globais
    AuthModule, // Módulo para autenticação
    UsersModule, // Módulo para usuários
  ],
})
export class AppModule {}
