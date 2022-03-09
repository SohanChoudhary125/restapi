import { IsOptional } from 'class-validator';

export class getpostFilter {
  @IsOptional()
  search: string;
}

export class updatingPost {
  title: string;
  description: string;
}
