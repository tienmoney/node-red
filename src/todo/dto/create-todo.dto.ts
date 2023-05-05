import { IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  status?: number;
  @IsString()
  media?: string;
}
