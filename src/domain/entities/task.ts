export class Task {
  id: string;
  description: string;
  completed: boolean;

  constructor(id: string, description: string, completed: boolean) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }
}
