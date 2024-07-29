import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // Adiciona a validação de dados ao método create
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.flatMap((error) => {
          if (error.constraints) {
            return Object.values(error.constraints);
          }
          return [];
        });
        return new BadRequestException(messages.join('; '));
      },
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    // Verifica se o nome de usuário e a senha foram fornecidos
    if (
      !createUserDto.username ||
      !createUserDto.password ||
      !createUserDto.email
    ) {
      throw new BadRequestException('Username and password are required');
    }

    // Cria o usuário
    const user = await this.usersService.create(createUserDto);
    return user;
  }
}
