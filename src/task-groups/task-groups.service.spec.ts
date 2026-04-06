import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskGroupsService } from './task-groups.service';

describe('TaskGroupsService', () => {
  const prismaMock = {
    grupoTareas: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    tarea: {
      findMany: jest.fn(),
    },
  };

  let service: TaskGroupsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TaskGroupsService(prismaMock as unknown as PrismaService);
  });

  describe('findTasksByGroup', () => {
    it('returns tasks ordered by orden and id when the group exists', async () => {
      const groupId = 1;
      const tasks = [
        { idTarea: 1, nombreTarea: 'Primera tarea', idGrupoTareas: groupId },
        { idTarea: 2, nombreTarea: 'Segunda tarea', idGrupoTareas: groupId },
      ];

      prismaMock.grupoTareas.findUnique.mockResolvedValue({
        idGrupoTareas: groupId,
        nombreGrupo: 'Trabajo',
        tareas: [],
      });
      prismaMock.tarea.findMany.mockResolvedValue(tasks);

      const result = await service.findTasksByGroup(groupId);

      expect(prismaMock.grupoTareas.findUnique).toHaveBeenCalledWith({
        where: { idGrupoTareas: groupId },
        include: { tareas: true },
      });
      expect(prismaMock.tarea.findMany).toHaveBeenCalledWith({
        where: { idGrupoTareas: groupId },
        orderBy: [{ orden: 'asc' }, { idTarea: 'asc' }],
      });
      expect(result).toEqual(tasks);
    });

    it('throws NotFoundException when group does not exist', async () => {
      const groupId = 999;
      prismaMock.grupoTareas.findUnique.mockResolvedValue(null);

      await expect(service.findTasksByGroup(groupId)).rejects.toThrow(
        new NotFoundException(`Grupo de tareas con id ${groupId} no existe`),
      );
      expect(prismaMock.tarea.findMany).not.toHaveBeenCalled();
    });
  });
});
