import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id?: string; // opcional, será gerado automaticamente
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
