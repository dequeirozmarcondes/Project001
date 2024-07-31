import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
