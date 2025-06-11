import { Todo, TodoRepository } from "@core/domain/entities/Todo";

export class GetTodosUseCase {
  constructor(private todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
}
