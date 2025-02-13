import { IsArray, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindTranslationDto {
  @ValidateIf((o) => !o.pl)
  @Transform(({ value }) => {
    if (typeof value === 'string') return [value.toLowerCase()];
    if (Array.isArray(value)) return value.map((v) => v.toLowerCase());
    return value;
  })
  @IsArray()
  en?: string[];

  @ValidateIf((o) => !o.en)
  @Transform(({ value }) => {
    if (typeof value === 'string') return [value.toLowerCase()];
    if (Array.isArray(value)) return value.map((v) => v.toLowerCase());
    return value;
  })
  @IsArray()
  pl?: string[];
}
