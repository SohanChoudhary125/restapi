import { IsNotEmpty, IsOptional } from 'class-validator';

export class getUserFilter {
  @IsOptional()
  search: string;
}

export class updatingUser {
  name: string;
  email: string;
  password: string;
}

export class validUser {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
