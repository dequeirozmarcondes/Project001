import { Module } from '@nestjs/common';
import { ValidatePasswordService } from '../validate-password';
import { USER_REPOSITORY_TOKEN } from '../../tokens';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Module({
  providers: [
    PrismaService,
    ValidatePasswordService,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
  ],
  exports: [ValidatePasswordService],
})
export class ValidatePasswordModule {}
