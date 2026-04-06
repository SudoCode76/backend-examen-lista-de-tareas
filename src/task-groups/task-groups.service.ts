import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskGroupDto } from './dto/create-task-group.dto';
import { UpdateTaskGroupDto } from './dto/update-task-group.dto';

@Injectable()
export class TaskGroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskGroupDto: CreateTaskGroupDto) {
    return this.prisma.grupoTareas.create({
      data: {
        nombreGrupo: createTaskGroupDto.nombreGrupo,
        orden: createTaskGroupDto.orden,
      },
    });
  }

  async findAll() {
    return this.prisma.grupoTareas.findMany({
      orderBy: [{ orden: 'asc' }, { idGrupoTareas: 'asc' }],
      include: {
        tareas: {
          orderBy: [{ orden: 'asc' }, { idTarea: 'asc' }],
        },
      },
    });
  }

  async findOne(id: number) {
    const taskGroup = await this.prisma.grupoTareas.findUnique({
      where: { idGrupoTareas: id },
      include: { tareas: true },
    });

    if (!taskGroup) {
      throw new NotFoundException(`Grupo de tareas con id ${id} no existe`);
    }

    return taskGroup;
  }

  async findTasksByGroup(id: number) {
    await this.findOne(id);

    return this.prisma.tarea.findMany({
      where: { idGrupoTareas: id },
      orderBy: [{ orden: 'asc' }, { idTarea: 'asc' }],
    });
  }

  async update(id: number, updateTaskGroupDto: UpdateTaskGroupDto) {
    await this.findOne(id);

    return this.prisma.grupoTareas.update({
      where: { idGrupoTareas: id },
      data: {
        nombreGrupo: updateTaskGroupDto.nombreGrupo,
        orden: updateTaskGroupDto.orden,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.grupoTareas.delete({
      where: { idGrupoTareas: id },
    });
  }
}
