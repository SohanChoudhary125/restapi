import { IsNotEmpty } from 'class-validator';

export class addUser {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
