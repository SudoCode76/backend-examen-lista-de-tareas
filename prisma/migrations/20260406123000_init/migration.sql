-- CreateTable
CREATE TABLE "public"."grupo_tareas" (
    "id_grupo_tareas" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
    "nombre_grupo" VARCHAR(50) NOT NULL,

    CONSTRAINT "grupo_tareas_pkey" PRIMARY KEY ("id_grupo_tareas")
);

-- CreateTable
CREATE TABLE "public"."tareas" (
    "id_tarea" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
    "nombre_tarea" VARCHAR(50) NOT NULL,
    "id_grupo_tareas" INTEGER NOT NULL,

    CONSTRAINT "tareas_pkey" PRIMARY KEY ("id_tarea")
);

-- AddForeignKey
ALTER TABLE "public"."tareas" ADD CONSTRAINT "tareas_id_grupo_tareas_fkey" FOREIGN KEY ("id_grupo_tareas") REFERENCES "public"."grupo_tareas"("id_grupo_tareas") ON DELETE CASCADE ON UPDATE CASCADE;
