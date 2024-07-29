import 'reflect-metadata';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  validate,
  ValidationError,
} from 'class-validator';

export class User {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(3, 255, { message: 'Name must be at least 3 characters' })
  private _username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  private _email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  private _password: string;

  @IsOptional()
  @IsDate({ message: 'Invalid date' })
  private _createdAt?: Date;

  @IsOptional()
  @IsDate({ message: 'Invalid date' })
  private _updatedAt?: Date;

  private _id?: string;

  constructor(
    username: string,
    email: string,
    password: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this._username = username;
    this._email = email;
    this._password = password;
    this._id = id;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  public get id(): string | undefined {
    return this._id;
  }

  public set id(value: string | undefined) {
    this._id = value;
  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }

  public get createdAt(): Date | undefined {
    return this._createdAt;
  }

  public set createdAt(value: Date | undefined) {
    this._createdAt = value;
  }

  public get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  public set updatedAt(value: Date | undefined) {
    this._updatedAt = value;
  }

  public toJSON() {
    return {
      id: this._id,
      username: this._username,
      email: this._email,
      createdAt: this._createdAt?.toISOString(),
      updatedAt: this._updatedAt?.toISOString(),
    };
  }

  // Método para criar e validar um objeto User
  public static async createAndValidate(
    username: string,
    email: string,
    password: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): Promise<User> {
    const user = new User(username, email, password, id, createdAt, updatedAt);

    const errors: ValidationError[] = await validate(user, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(
        errors
          .map((err) => Object.values(err.constraints || {}).join(', '))
          .join('; '),
      );
    }

    return user;
  }
}

// Exemplo de uso para testar validações
(async () => {
  try {
    const user = await User.createAndValidate(
      'Jooo', // Nome curto para testar a validação de comprimento
      'teste@email.com', // Email inválido
      '123@123#', // Senha curta para testar a validação de comprimento
    );
    console.log(user.toJSON());
  } catch (error) {
    console.error('Validation failed:', error.message);
  }
})();
