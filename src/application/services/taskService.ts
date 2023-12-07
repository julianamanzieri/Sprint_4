import { Task } from '../../domain/entities/task';
import { TodoRepository } from '../../infrastructure/repositories/todoRepository';

// Declara a classe que representa as tarefas
export class TaskService {
  private tasks: Task[] = [];
  private nextId: number = 1;
  private todoRepository: TodoRepository;

  // Aceita uma instancia da TodoRepository como parametro e associas a propriedade todoRepository
  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  // Cria e add uma nova tarefa que recebe uma descrição como parametro
  addTask(description: string): Task {
    const task: Task = {
      id: this.nextId.toString(),
      description,
      completed: false
    };
    this.todoRepository.createTask(task);
    this.nextId++;
    return task;
  }

  // Marca tarefa como concluida, encontra no repositorio e marca como concluida e se encontrada retonra true, senão retorna false
  completeTask(taskId: string): boolean {
    const task = this.todoRepository.getTasks().find((t) => t.id === taskId);
    if (task) {
      task.completed = true;
      this.todoRepository.completeTask(taskId);
      return true;
    }
    return false;
  }

  // Remove uma tarefa e utiliza o método removeTask do TodoRepository para remover a tarefa
  removeTask(taskId: string): boolean {
    const removed = this.todoRepository.removeTask(taskId);

    return removed;
  }

  // Retorna a lista de tarefas no repositorio
  getTasks(): Task[] {
    return this.todoRepository.getTasks();
  }
}
