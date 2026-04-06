import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTaskGroupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombreGrupo: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;
}
