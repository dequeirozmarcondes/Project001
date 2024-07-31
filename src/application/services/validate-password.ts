import { Injectable, ConflictException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '../interfaces/user.repository.interface';
import { User } from 'src/domain/entities/user.entity';
import { USER_REPOSITORY_TOKEN } from '../tokens';

@Injectable()
export class ValidatePasswordService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async validatePassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    try {
      const user = await this.userRepository.findByUsername(username);

      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      }

      return null;
    } catch (error) {
      throw new ConflictException(
        'An error occurred while validating the password.',
      );
    }
  }
}
