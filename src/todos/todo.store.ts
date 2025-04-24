export interface Todo {
  id: number;
  userEmail: string;
  content: string;
  completed: boolean;
}

export const todos: Todo[] = [];
