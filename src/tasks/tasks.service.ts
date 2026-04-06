import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  private async ensureGroupExists(idGrupoTareas: number) {
    const group = await this.prisma.grupoTareas.findUnique({
      where: { idGrupoTareas },
    });

    if (!group) {
      throw new NotFoundException(
        `Grupo de tareas con id ${idGrupoTareas} no existe`,
      );
    }
  }

  async create(createTaskDto: CreateTaskDto) {
    await this.ensureGroupExists(createTaskDto.idGrupoTareas);

    return this.prisma.tarea.create({
      data: {
        nombreTarea: createTaskDto.nombreTarea,
        idGrupoTareas: createTaskDto.idGrupoTareas,
        completada: createTaskDto.completada,
        orden: createTaskDto.orden,
      },
      include: { grupoTareas: true },
    });
  }

  async findAll() {
    return this.prisma.tarea.findMany({
      orderBy: [{ orden: 'asc' }, { idTarea: 'asc' }],
      include: { grupoTareas: true },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.tarea.findUnique({
      where: { idTarea: id },
      include: { grupoTareas: true },
    });

    if (!task) {
      throw new NotFoundException(`Tarea con id ${id} no existe`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);

    if (updateTaskDto.idGrupoTareas !== undefined) {
      await this.ensureGroupExists(updateTaskDto.idGrupoTareas);
    }

    return this.prisma.tarea.update({
      where: { idTarea: id },
      data: {
        nombreTarea: updateTaskDto.nombreTarea,
        idGrupoTareas: updateTaskDto.idGrupoTareas,
        completada: updateTaskDto.completada,
        orden: updateTaskDto.orden,
      },
      include: { grupoTareas: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.tarea.delete({
      where: { idTarea: id },
    });
  }
}
