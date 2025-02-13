import { IsArray, IsNumber } from 'class-validator';

export class CreateWordDto {
  @IsArray()
  en: string[];

  @IsArray()
  pl: string[];

  @IsNumber()
  userId: number;
}
