import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class addUser {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
