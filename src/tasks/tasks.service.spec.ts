import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  const prismaMock = {
    grupoTareas: {
      findUnique: jest.fn(),
    },
    tarea: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  let service: TasksService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TasksService(prismaMock as unknown as PrismaService);
  });

  describe('create', () => {
    it('throws NotFoundException when group does not exist', async () => {
      prismaMock.grupoTareas.findUnique.mockResolvedValue(null);

      await expect(
        service.create({
          nombreTarea: 'Comprar leche',
          idGrupoTareas: 999,
          completada: false,
          orden: 1,
        }),
      ).rejects.toThrow(
        new NotFoundException('Grupo de tareas con id 999 no existe'),
      );

      expect(prismaMock.tarea.create).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('throws NotFoundException when task does not exist', async () => {
      prismaMock.tarea.findUnique.mockResolvedValue(null);

      await expect(
        service.update(123, {
          nombreTarea: 'Renombrada',
        }),
      ).rejects.toThrow(new NotFoundException('Tarea con id 123 no existe'));

      expect(prismaMock.tarea.update).not.toHaveBeenCalled();
    });
  });
});
