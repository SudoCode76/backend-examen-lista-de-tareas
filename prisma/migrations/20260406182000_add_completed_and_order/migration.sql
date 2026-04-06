-- Add ordering to task groups
ALTER TABLE "public"."grupo_tareas"
ADD COLUMN "orden" INTEGER NOT NULL DEFAULT 0;

-- Add completion and ordering to tasks
ALTER TABLE "public"."tareas"
ADD COLUMN "completada" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "orden" INTEGER NOT NULL DEFAULT 0;

-- Preserve current visual order for existing data
UPDATE "public"."grupo_tareas"
SET "orden" = "id_grupo_tareas"
WHERE "orden" = 0;

UPDATE "public"."tareas"
SET "orden" = "id_tarea"
WHERE "orden" = 0;
