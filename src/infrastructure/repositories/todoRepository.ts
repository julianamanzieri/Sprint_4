import { Task } from '../../domain/entities/task';

export class TodoRepository {
  tasks: Task[] = [];

  // Declara o método createTask que recebe um objeto task do tipo Task como parametro e o adiciona ao array tasks da instancia
  createTask(task: Task): void {
    this.tasks.push(task);
  }

  // Declara o método completeTask que recebe um taskId como parametro e procura uma tarefa no array e se encontra marca como concluida
  completeTask(taskId: string): void {
    console.log('repository', taskId);
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = true;
    }
  }

  removeTask(taskId: string): boolean {
    // Procura o índice da tarefa com o ID correspondente no array tasks
    const index = this.tasks.findIndex((t) => t.id === taskId);

    // Verifica se a tarefa foi encontrada
    if (index !== -1) {
      // Remove a tarefa do array tasks
      this.tasks.splice(index, 1);
      return true;
    }

    return false;
  }

  // Declara o método getTasks que retorna o array completo de tarefas
  getTasks(): Task[] {
    return this.tasks;
  }
}
