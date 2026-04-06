import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskGroupDto } from './dto/create-task-group.dto';
import { UpdateTaskGroupDto } from './dto/update-task-group.dto';

@Injectable()
export class TaskGroupsService {
  constructor(private readonly prisma: PrismaService) {}

  private buildCreateTaskGroupData(dto: CreateTaskGroupDto) {
    return {
      nombreGrupo: dto.nombreGrupo,
      orden: dto.orden,
    };
  }

  private buildUpdateTaskGroupData(dto: UpdateTaskGroupDto) {
    return {
      nombreGrupo: dto.nombreGrupo,
      orden: dto.orden,
    };
  }

  private async ensureTaskGroupExists(id: number) {
    const taskGroup = await this.prisma.grupoTareas.findUnique({
      where: { idGrupoTareas: id },
      select: { idGrupoTareas: true },
    });

    if (!taskGroup) {
      throw new NotFoundException(`Grupo de tareas con id ${id} no existe`);
    }
  }

  async create(createTaskGroupDto: CreateTaskGroupDto) {
    return this.prisma.grupoTareas.create({
      data: this.buildCreateTaskGroupData(createTaskGroupDto),
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
      include: {
        tareas: {
          orderBy: [{ orden: 'asc' }, { idTarea: 'asc' }],
        },
      },
    });

    if (!taskGroup) {
      throw new NotFoundException(`Grupo de tareas con id ${id} no existe`);
    }

    return taskGroup;
  }

  async findTasksByGroup(id: number) {
    await this.ensureTaskGroupExists(id);

    return this.prisma.tarea.findMany({
      where: { idGrupoTareas: id },
      orderBy: [{ orden: 'asc' }, { idTarea: 'asc' }],
    });
  }

  async update(id: number, updateTaskGroupDto: UpdateTaskGroupDto) {
    await this.ensureTaskGroupExists(id);

    return this.prisma.grupoTareas.update({
      where: { idGrupoTareas: id },
      data: this.buildUpdateTaskGroupData(updateTaskGroupDto),
    });
  }

  async remove(id: number) {
    await this.ensureTaskGroupExists(id);

    return this.prisma.grupoTareas.delete({
      where: { idGrupoTareas: id },
    });
  }
}
