import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly expiresIn: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    // Define o tempo de expiração a partir da variável de ambiente ou um valor padrão
    const expiresInEnv = process.env.JWT_EXPIRES_IN ?? '3600'; // Fallback para '3600' se for undefined
    this.expiresIn = parseInt(expiresInEnv, 10);
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string; expires_in: number }> {
    // Valida o usuário
    const user = await this.usersService.validatePassword(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Cria o payload para o token JWT
    const payload = { sub: user.id, name: user.name };

    // Gera o token JWT
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: this.expiresIn,
    });

    // Retorna o token e o tempo de expiração
    return {
      access_token,
      expires_in: this.expiresIn,
    };
  }
}
