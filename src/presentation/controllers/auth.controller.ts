import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '../../application/services/auth/auth.guard';
import { AuthService } from '../../application/services/auth/auth.service';
import { Request } from 'express';
import { SignInDto } from '../../application/dtos/sign-in-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    // Verifica se username e password foram fornecidos
    if (!signInDto.username || !signInDto.password) {
      throw new BadRequestException('Username and password are required');
    }
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.username;
  }
}
