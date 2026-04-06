import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskGroupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombreGrupo: string;
}
