import { Request, Response } from 'express';
import { TaskService } from '../../../application/services/taskService';
// import { TodoRepository } from '../../repositories/todoRepository';

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  // Add uma nova tarefa, extrai adescrição do corpo e retorna uma resposta HTTP em formato json
  addTask(req: Request, res: Response): void {
    try {
      const { description } = req.body;
      const newTask = this.taskService.addTask(description);
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Marca tarfea como concluida e obtem o ID e se for bem sucessida envia a resposta corretamente
  completeTask(req: Request, res: Response): void {
    console.log('llega a complete');
    try {
      const taskId = req.params.taskId;
      console.log('taskid: ' + taskId);
      const success = this.taskService.completeTask(taskId);
      console.log('controller', taskId);

      if (success) {
        res
          .status(200)
          .json({ message: 'Task marked as completed successfully' });
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Remove uma tarefa e obtem o ID e se for bem sucessida envia a resposta corretamente
  removeTask(req: Request, res: Response): void {
    try {
      const taskId = req.params.taskId;
      const success = this.taskService.removeTask(taskId);

      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Lista as tarefas existentes que retorna em formato json com uma resposta HTTP
  getTasks(req: Request, res: Response): void {
    try {
      const tasks = this.taskService.getTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
