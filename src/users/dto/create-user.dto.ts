import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id?: string; // opcional, será gerado automaticamente
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
