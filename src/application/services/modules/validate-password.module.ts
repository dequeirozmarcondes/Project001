import { Module } from '@nestjs/common';
import { ValidatePasswordService } from '../auth/validate-password';
import { USER_REPOSITORY_TOKEN } from '../../tokens';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { PasswordHashService } from '../../../infrastructure/services/password-hash.service';

@Module({
  providers: [
    PrismaService,
    ValidatePasswordService,
    PasswordHashService,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
  ],
  exports: [ValidatePasswordService, PasswordHashService],
})
export class ValidatePasswordModule {}
