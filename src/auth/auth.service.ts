import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const expirationTime = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
    this.jwtExpirationTimeInSeconds = expirationTime ? +expirationTime : 3600;
  }

  async signIn(username: string, password: string): Promise<AuthResponseDto> {
    console.log(`Attempting to sign in user: ${username}`);

    // Buscar o usuário pelo nome de usuário
    const foundUser = await this.usersService.findByUserName(username);

    // Verificar se o usuário existe
    if (!foundUser) {
      console.log(`User not found: ${username}`);
      throw new UnauthorizedException('Invalid username or password');
    }

    console.log(`Found user: ${JSON.stringify(foundUser)}`);

    // Comparar a senha fornecida com a senha armazenada (texto simples)
    if (password !== foundUser.password) {
      console.log('Invalid password');
      throw new UnauthorizedException('Invalid username or password');
    }

    console.log('Password is valid');

    // Gerar o payload do JWT
    const payload = { sub: foundUser.id, username: foundUser.username };
    const token = this.jwtService.sign(payload, {
      expiresIn: this.jwtExpirationTimeInSeconds,
    });

    // Retornar o token e o tempo de expiração
    return {
      token,
      expiresIn: this.jwtExpirationTimeInSeconds,
    };
  }
}
