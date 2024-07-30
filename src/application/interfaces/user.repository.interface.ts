import { User } from 'src/domain/entities/user.entity';

export interface UserRepositoryInterface {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  //   findById(id: string): Promise<User | null>;
  //   update(user: User): Promise<User>;
  //   delete(id: string): Promise<void>;
}
