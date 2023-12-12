# ToDo List API REST

Este proyecto crearemos un servidor utilizando Express.js, para proporcionar servicio a la API REST de la lista de tareas (TODO-LIST), aplicando la arquitectura hexagonal y implementaremos las siguientes funcionalidades:

- Añadir una tarea a la lista: Implementaremos una ruta y un controlador para permitir a los usuarios añadir nuevas tareas a su lista.

- Marcar una tarea como completada: Crearemos una ruta y un controlador para permitir a los usuarios marcar una tarea como completada.

- Eliminar una tarea de la lista: Implementaremos una funcionalidad para eliminar tareas de la lista utilizando una ruta y un controlador adecuados.

- Mostrar la lista de tareas: Crearemos una ruta y un controlador para obtener y mostrar la lista completa de tareas a los usuarios.

## Tecnologías

- [TypeScript](https://www.typescriptlang.org/)
- Node.js
- Jest
- Express

## Prerrequisitos

Asegúrate de tener las tecnologías instaladas en tu sistema.

## Instruciones de Uso

1. Clona el repositorio:

```
https://github.com/julianamanzieri/Sprint_4.git
```

2. Instala las dependencias:

```
npm install
```

3. Ejecuta el programa utilizando el siguiente comando:

```
npm start
```

4. Compile el código TypeScript usando el comando:

```
tsc
```

Esto iniciará el servidor y lo pondrá a disposición en http://localhost:3000

## API Endpoints

- POST

```
POST /tasks/add: Add a new task to the list.
Request Body: { "description": "Task description" }
Response: 201 Created
```

- PUT

```
PUT /tasks/complete/:taskId: Mark a task as completed.
Response: 200 OK if successful, 404 Not Found if the task is not found.
```

- DELETE

```
DELETE/tasks/remove/:taskId: Remove a task from the list.
Response: 204 No Content if successful, 404 Not Found if the task is not found.
```

- GET

```
GET /tasks/list: Get the list of tasks.
Response: 200 OK with the list of tasks.
```

## Pruebas

Este proyecto utiliza Jest para realizar pruebas.

- `npm test`: Ejecuta las pruebas utilizando Jest.

Este proyecto fue desarrollado como Sprint 4 en IT Academy.
