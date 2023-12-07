import { Task } from '../domain/entities/task';

export interface TodoRepository {
  addTask(description: string): Task;
  completeTask(id: string): Task | null;
  removeTask(id: string): boolean;
  getTasks(): Task[];
}
