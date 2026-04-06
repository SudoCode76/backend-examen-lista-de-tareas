import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombreTarea: string;

  @IsInt()
  @Min(1)
  idGrupoTareas: number;
}
