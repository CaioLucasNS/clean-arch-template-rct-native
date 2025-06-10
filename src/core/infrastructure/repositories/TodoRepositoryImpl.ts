import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo, TodoRepository } from "../../domain/entities/Todo";

export class TodoRepositoryImpl implements TodoRepository {
  private readonly STORAGE_KEY = "@todos";

  async findAll(): Promise<Todo[]> {
    const todosJson = await AsyncStorage.getItem(this.STORAGE_KEY);
    return todosJson ? JSON.parse(todosJson) : [];
  }

  async findById(id: string): Promise<Todo | null> {
    const todos = await this.findAll();
    return todos.find((todo) => todo.id === id) || null;
  }

  async create(
    todoData: Omit<Todo, "id" | "createdAt" | "updatedAt">
  ): Promise<Todo> {
    const todos = await this.findAll();
    const newTodo: Todo = {
      ...todoData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await AsyncStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify([...todos, newTodo])
    );
    return newTodo;
  }

  async update(id: string, todoData: Partial<Todo>): Promise<Todo> {
    const todos = await this.findAll();
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      throw new Error("Todo not found");
    }

    const updatedTodo = {
      ...todos[index],
      ...todoData,
      updatedAt: new Date(),
    };

    todos[index] = updatedTodo;
    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    return updatedTodo;
  }

  async delete(id: string): Promise<void> {
    const todos = await this.findAll();
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredTodos));
  }
}
