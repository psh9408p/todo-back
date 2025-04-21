import { todos } from "./todo.store";

let nextId = 1;

export function createTodo(userEmail: string, content: string) {
  const todo = { id: nextId++, userEmail, content };
  todos.push(todo);
  return todo;
}

export function getUserTodos(userEmail: string) {
  return todos.filter((t) => t.userEmail === userEmail);
}
