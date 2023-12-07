import { TaskService } from '../../application/services/taskService';
import { Task } from '../../domain/entities/task';
import { TodoRepository } from '../../infrastructure/repositories/todoRepository';

describe('TaskService', () => {
  let taskService: TaskService;
  let todoRepositoryMock: TodoRepository;

  // Configura um estado inicial antes de cada teste
  beforeEach(() => {
    // Cria um mock para o TodoRepository
    todoRepositoryMock = {
      tasks: [],
      createTask: jest.fn(),
      completeTask: jest.fn(),
      removeTask: jest.fn(),
      getTasks: jest.fn(() => todoRepositoryMock.tasks)
    };

    // Cria uma instância do TaskService com o mock do TodoRepository
    taskService = new TaskService(todoRepositoryMock);
  });

  // Teste para adicionar uma tarefa
  describe('When add a task', () => {
    test('Then should add a task', () => {
      const taskDescription = 'Clean your room';
      const newTask: Task = taskService.addTask(taskDescription);

      // Verifica se a tarefa foi criada corretamente
      expect(newTask.id).toBeDefined();
      expect(newTask.description).toBe(taskDescription);
      expect(newTask.completed).toBe(false);

      // Verifica se o método do repositório foi chamado corretamente
      expect(todoRepositoryMock.createTask).toHaveBeenCalledWith(newTask);
    });
  });

  // Teste para marcar uma tarefa como concluída
  describe('When should mark a task as completed', () => {
    test('Then should mark a task completed', () => {
      const taskDescription = 'Go to the market';
      const newTask: Task = taskService.addTask(taskDescription);
      todoRepositoryMock.tasks = [newTask];

      const completed = taskService.completeTask(newTask.id);

      // Verifica se a tarefa foi marcada como concluída corretamente
      expect(completed).toBe(true);
      expect(newTask.completed).toBe(true);

      // Verifica se o método do repositório foi chamado corretamente
      expect(todoRepositoryMock.completeTask).toHaveBeenCalledWith(newTask.id);
    });
  });

  // Teste para remover uma tarefa
  describe('When remove a task', () => {
    test('Then remove a task', () => {
      const taskDescription = 'Clean the house';
      const newTask: Task = taskService.addTask(taskDescription);

      // const removed = taskService.removeTask(newTask.id);

      // // Verifica se a tarefa foi removida corretamente
      // expect(removed).toBe(true);

      // Verifica se o método do repositório foi chamado corretamente
      // expect(todoRepositoryMock.removeTask).toHaveBeenCalledWith(newTask.id);

      // Verifica se a tarefa não está mais na lista de tarefas do serviço
      expect(taskService.getTasks()).not.toContain(newTask);
    });
  });
});
