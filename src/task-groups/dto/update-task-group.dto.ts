import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTaskGroupDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombreGrupo?: string;
}
