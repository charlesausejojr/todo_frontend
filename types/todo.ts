export interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
}

export interface CreateTodoData {
  title: string;
  description: string | null;
}

export interface UpdateTodoData {
  title?: string;
  description?: string | null;
  completed?: boolean;
}
