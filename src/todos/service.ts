import { todos } from "./todo.store";

let nextId = 1;

export function createTodo(userEmail: string, content: string) {
  const todo = { id: nextId++, userEmail, content, completed: false };
  todos.push(todo);
  return todo;
}

export function getUserTodos(userEmail: string) {
  return todos.filter((t) => t.userEmail === userEmail);
}

export function updateTodo(
  id: number,
  userEmail: string,
  updates: Partial<{ content: string; completed: boolean }>
) {
  const index = todos.findIndex(
    (t) => t.id === id && t.userEmail === userEmail
  );
  if (index === -1) return null;

  todos[index] = { ...todos[index], ...updates };
  return todos[index];
}

export function deleteTodo(id: number, userEmail: string) {
  const index = todos.findIndex(
    (t) => t.id === id && t.userEmail === userEmail
  );
  if (index === -1) return false;

  todos.splice(index, 1);
  return true;
}

export function toggleTodoCompleted(id: number, userEmail: string) {
  const index = todos.findIndex(
    (t) => t.id === id && t.userEmail === userEmail
  );
  if (index === -1) return null;

  todos[index].completed = !todos[index].completed;
  return todos[index];
}
