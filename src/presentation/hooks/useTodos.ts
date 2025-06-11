import { useState, useCallback } from "react";
import { Todo } from "@core/domain/entities/Todo";
import { TodoRepositoryImpl } from "@core/infrastructure/repositories/TodoRepositoryImpl";
import { GetTodosUseCase } from "@core/application/useCases/todo/GetTodosUseCase";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repository = new TodoRepositoryImpl();

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const getTodosUseCase = new GetTodosUseCase(repository);
      const todosList = await getTodosUseCase.execute();
      setTodos(todosList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = useCallback(
    async (todoData: Omit<Todo, "id" | "createdAt" | "updatedAt">) => {
      try {
        setLoading(true);
        setError(null);
        const newTodo = await repository.create(todoData);
        setTodos((prev) => [...prev, newTodo]);
        return newTodo;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateTodo = useCallback(
    async (id: string, todoData: Partial<Todo>) => {
      try {
        setLoading(true);
        setError(null);
        const updatedTodo = await repository.update(id, todoData);
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
        );
        return updatedTodo;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteTodo = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await repository.delete(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    todos,
    loading,
    error,
    loadTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};
