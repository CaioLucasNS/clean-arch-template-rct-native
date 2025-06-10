/**
 * Interface que representa uma tarefa (Todo) no sistema
 */
export interface Todo {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

/**
 * Interface que define o contrato para o repositório de tarefas
 */
export interface TodoRepository {
  buscarTodos(): Promise<Todo[]>;
  buscarPorId(id: string): Promise<Todo | null>;
  criar(
    todo: Omit<Todo, "id" | "dataCriacao" | "dataAtualizacao">
  ): Promise<Todo>;
  atualizar(id: string, todo: Partial<Todo>): Promise<Todo>;
  excluir(id: string): Promise<void>;
}
