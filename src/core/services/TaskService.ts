import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../models/Task";

const TASKS_STORAGE_KEY = "@tasks";

export class TaskService {
  static async getTasks(): Promise<Task[]> {
    try {
      const tasksJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (!tasksJson) return [];

      const tasks = JSON.parse(tasksJson);
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
    } catch (error) {
      console.error("Erro ao buscar tasks:", error);
      return [];
    }
  }

  static async saveTask(task: Task): Promise<void> {
    try {
      const tasks = await this.getTasks();
      tasks.push(task);
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Erro ao salvar task:", error);
      throw error;
    }
  }

  static async updateTask(updatedTask: Task): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const index = tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        tasks[index] = updatedTask;
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      }
    } catch (error) {
      console.error("Erro ao atualizar task:", error);
      throw error;
    }
  }

  static async deleteTask(taskId: string): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      await AsyncStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(filteredTasks)
      );
    } catch (error) {
      console.error("Erro ao deletar task:", error);
      throw error;
    }
  }

  static async completeTask(taskId: string): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        task.isCompleted = true;
        task.completedAt = new Date();
        await this.updateTask(task);
      }
    } catch (error) {
      console.error("Erro ao completar task:", error);
      throw error;
    }
  }
}
