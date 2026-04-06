BEGIN;

ALTER TABLE "public"."grupo_tareas"
ADD COLUMN IF NOT EXISTS "orden" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "public"."tareas"
ADD COLUMN IF NOT EXISTS "completada" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "orden" INTEGER NOT NULL DEFAULT 0;

UPDATE "public"."grupo_tareas"
SET "orden" = "id_grupo_tareas"
WHERE "orden" = 0;

UPDATE "public"."tareas"
SET "orden" = "id_tarea"
WHERE "orden" = 0;

COMMIT;
