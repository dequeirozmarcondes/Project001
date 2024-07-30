export class User {
  private _username: string;
  private _email: string;
  private _password: string;
  private _createdAt?: Date;
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
}
