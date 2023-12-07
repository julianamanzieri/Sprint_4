import request from 'supertest';
import express, { Router, Request, Response } from 'express';
import { TaskService } from '../../application/services/taskService';
import { TaskController } from '../../infrastructure/interfaces/controllers/taskController';
import { TodoRepository } from '../../infrastructure/repositories/todoRepository';

// Cria instâncias de classes necessárias
const todoRepository = new TodoRepository();
const taskService = new TaskService(todoRepository);
const taskController = new TaskController(taskService);
const router: Router = express.Router();

// Configura rotas no router para as operações CRUD
router.post('/add', (req: Request, res: Response) =>
  taskController.addTask(req, res)
);
router.put('/complete/:taskId', (req: Request, res: Response) =>
  taskController.completeTask(req, res)
);
router.delete('/remove/:taskId', (req: Request, res: Response) =>
  taskController.removeTask(req, res)
);
router.get('/list', (req: Request, res: Response) =>
  taskController.getTasks(req, res)
);

// Cria uma instância do aplicativo Express
const app = express();
// Configura o middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());
// Configura o aplicativo Express para usar o router no caminho '/tasks'
app.use('/tasks', router);

// Testa se a rota POST /tasks/add adiciona uma tarefa corretamente
describe('Task Routes', () => {
  test('should add a task when POST /tasks/add is called', async () => {
    const response = await request(app)
      .post('/tasks/add')
      .send({ description: 'New task' });

    expect(response.status).toBe(201);
  });

  // // Testa se a rota PUT /tasks/complete/:taskId marca como completa as tarefas corretamente
  // test('should mark a task as completed when PUT /tasks/complete/:taskId is called', async () => {
  //   const existingTaskId = 'existingTaskId';
  //   const response = await request(app).put(
  //     `/tasks/complete/${existingTaskId}`
  //   );
  //   expect(response.body).toEqual(200);
  // });

  // // Testa se a rota DELETE /tasks/remove/:taskId remove tarefas corretamente
  // test('should remove a task when DELETE /tasks/remove/:taskId is called', async () => {
  //   const existingTaskId = 'existingTaskId';
  //   const response = await request(app).delete(
  //     `/tasks/remove/${existingTaskId}`
  //   );

  //   expect(response.status).toBe(204);
  // });

  // Testa se a rota GET /tasks/list retorna a lista de tarefas corretamente
  test('should get the list of tasks when GET /tasks/list is called', async () => {
    const response = await request(app).get('/tasks/list');

    expect(response.status).toBe(200);
  });
});
