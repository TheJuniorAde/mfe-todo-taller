declare module "host/Footer"
declare module "host/Header"
declare module "host/Context" {
  interface TodoItem {
    id: string
    description: string
    status: "completed" | "incomplete"
    createdAt: string
    finishedAt: string
  }
  const TodoContext: React.Context<{
    list: TodoItem[]
    updateData: typeof updateData
    toggleStatus: typeof toggleStatus
  }>

  function loadStorageData(): TodoItem[]
  function updateData(newTodo: TodoItem): void
  function toggleStatus(newTodo: TodoItem): void
}
