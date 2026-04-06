# Backend - Analisis Arquitectonico

## 1) Tipo de arquitectura del proyecto base

El proyecto esta construido con **NestJS** y sigue una arquitectura **modular monolitica** con estilo **en capas**:

- **Capa de entrada (Controllers)**: expone endpoints HTTP y valida parametros.
- **Capa de aplicacion (Services)**: contiene reglas de negocio y orquesta operaciones.
- **Capa de acceso a datos (PrismaService)**: centraliza la comunicacion con PostgreSQL usando Prisma ORM.
- **Capa de contrato (DTOs)**: define y valida el formato de datos de entrada.

En resumen: no es microservicios, sino un solo backend organizado por dominios funcionales.

## 2) Modulos y componentes identificados

### Modulos principales

- **AppModule**: modulo raiz, integra configuracion y registra modulos funcionales.
- **PrismaModule**: modulo global con `PrismaService` para acceso a base de datos.
- **TaskGroupsModule**: gestion de grupos de tareas.
- **TasksModule**: gestion de tareas.

### Componentes por modulo

- **TaskGroupsController / TaskGroupsService**
  - CRUD de grupos.
  - Listado de tareas por grupo.
- **TasksController / TasksService**
  - CRUD de tareas.
  - Validacion de existencia de grupo al crear/actualizar tarea.
- **HealthController / HealthService**
  - Endpoint de salud para comprobar conexion a base de datos.

### Persistencia

- **Prisma Schema** con entidades:
  - `GrupoTareas`
  - `Tarea`
- Relacion 1:N (un grupo tiene muchas tareas) con borrado en cascada.

## 3) Mejoras arquitectonicas propuestas para mayor mantenibilidad

1. **Separar mejor reglas de dominio**
   - Extraer validaciones repetidas a clases/helpers de dominio (por ejemplo, existencia de entidad, reglas de orden).

2. **Estandarizar respuestas y errores**
   - Definir un formato unico de respuesta y manejo de errores con filtros globales (`ExceptionFilter`).

3. **Versionado de API**
   - Introducir `v1` en rutas para permitir evolucion sin romper clientes frontend.



---

