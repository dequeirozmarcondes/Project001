import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordHashServiceInterface } from 'src/domain/repositories/interfaces/password-hash.service.interface';

@Injectable()
export class PasswordHashService implements PasswordHashServiceInterface {
  private readonly saltRounds = 10;

  //Hash password
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  //Validate password
  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
