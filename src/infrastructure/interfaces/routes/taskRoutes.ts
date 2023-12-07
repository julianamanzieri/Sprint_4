import express, { Router, Request, Response } from 'express';
import { TaskController } from '../controllers/taskController';
import { TaskService } from '../../../application/services/taskService';
import { TodoRepository } from '../../repositories/todoRepository';

// Cria uma instancia utilizando as instancias anteriores e a dependencia entre essas classes é injetada, seguindo o princípio de inversão de controle
const todoRepository = new TodoRepository();
const taskService = new TaskService(todoRepository);
const taskController = new TaskController(taskService);

// Cria uma instancia do roteador do Express
const router: Router = express.Router();

// Configura uma rota POST /add que chama o método addTask do TaskController quando acessada
router.post('/add', (req: Request, res: Response) =>
  taskController.addTask(req, res)
);

// Configura uma rota PUT /complete/:taskId que chama o método completeTask do TaskController quando acessada
router.put('/complete/:taskId', (req: Request, res: Response) =>
  taskController.completeTask(req, res)
);

// Configura uma rota DELETE /remove/:taskId que chama o método removeTask do TaskController quando acessada
router.delete('/remove/:taskId', (req: Request, res: Response) =>
  taskController.removeTask(req, res)
);

// Configura uma rota GET /list que chama o método getTasks do TaskController quando acessada
router.get('/list', (req: Request, res: Response) =>
  taskController.getTasks(req, res)
);

export default router;
