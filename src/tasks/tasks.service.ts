import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly includeTaskGroup = { grupoTareas: true } as const;

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

  private async ensureTaskExists(id: number) {
    const task = await this.prisma.tarea.findUnique({
      where: { idTarea: id },
      select: { idTarea: true },
    });

    if (!task) {
      throw new NotFoundException(`Tarea con id ${id} no existe`);
    }
  }

  private buildCreateTaskData(dto: CreateTaskDto) {
    return {
      nombreTarea: dto.nombreTarea,
      idGrupoTareas: dto.idGrupoTareas,
      completada: dto.completada,
      orden: dto.orden,
    };
  }

  private buildUpdateTaskData(dto: UpdateTaskDto) {
    return {
      nombreTarea: dto.nombreTarea,
      idGrupoTareas: dto.idGrupoTareas,
      completada: dto.completada,
      orden: dto.orden,
    };
  }

  async create(createTaskDto: CreateTaskDto) {
    await this.ensureGroupExists(createTaskDto.idGrupoTareas);

    return this.prisma.tarea.create({
      data: this.buildCreateTaskData(createTaskDto),
      include: this.includeTaskGroup,
    });
  }

  async findAll() {
    return this.prisma.tarea.findMany({
      orderBy: [{ orden: 'asc' }, { idTarea: 'asc' }],
      include: this.includeTaskGroup,
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
    await this.ensureTaskExists(id);

    if (updateTaskDto.idGrupoTareas !== undefined) {
      await this.ensureGroupExists(updateTaskDto.idGrupoTareas);
    }

    return this.prisma.tarea.update({
      where: { idTarea: id },
      data: this.buildUpdateTaskData(updateTaskDto),
      include: this.includeTaskGroup,
    });
  }

  async remove(id: number) {
    await this.ensureTaskExists(id);

    return this.prisma.tarea.delete({
      where: { idTarea: id },
    });
  }
}
