export interface TodoContextState {
  list: TodoItem[]
  updateData: (newTodo: TodoItem) => void
  toggleStatus: (newTodo: TodoItem) => void
}

export interface TodoItem {
  id: string
  description: string
  status: "completed" | "incomplete"
  finishedAt: string
  createdAt: string
}
