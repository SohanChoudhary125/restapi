import { IsNotEmpty } from 'class-validator';

export class addPost {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
