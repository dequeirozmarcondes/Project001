import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

export class User {
  // Construtor que permite inicializar a classe com ou sem ID
  constructor(
    name: string,
    email: string,
    password: string,
    id?: string, // Opcional, já que é gerado pelo banco
    createdAt?: Date, // Inicializa com a data fornecida ou com a data atual
    updatedAt?: Date, // Inicializa com a data fornecida ou com a data atual
  ) {
    this._name = name;
    this._email = email;
    this._password = password;
    this._id = id;
    this._createdAt = createdAt || new Date(); // Usa a data atual se não fornecido
    this._updatedAt = updatedAt || new Date(); // Usa a data atual se não fornecido
  }

  private _id?: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(3, 255, { message: 'Name must be at least 3 characters' })
  private _name: string;

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

  public get id(): string | undefined {
    return this._id;
  }

  public set id(value: string | undefined) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
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
      name: this._name,
      email: this._email,
      createdAt: this._createdAt?.toISOString(), // Convertendo para string no formato ISO
      updatedAt: this._updatedAt?.toISOString(), // Convertendo para string no formato ISO
    };
  }
}
