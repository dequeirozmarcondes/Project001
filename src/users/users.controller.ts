import { Request as ExpressRequest } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    // Verifica se o nome de usuário e a senha foram fornecidos
    if (
      !createUserDto.name ||
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
