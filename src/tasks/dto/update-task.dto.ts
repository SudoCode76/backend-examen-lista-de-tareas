import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombreTarea?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  idGrupoTareas?: number;
}
