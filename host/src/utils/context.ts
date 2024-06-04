import { createContext } from "react"
import { v4 } from "uuid"
import { TodoContextState, TodoItem } from "./types"

export const TodoContext = createContext<TodoContextState>({
  list: [],
  updateData: () => null,
  toggleStatus: () => null,
})

export const loadStorageData = (): TodoItem[] => {
  const localData = localStorage.getItem("todo-list")
  let updatedData: TodoItem[] = []

  if (!localData || !String(localData).trim()) return []

  try {
    updatedData = JSON.parse(localData)
  } catch (_) {
    console.log("unable to parse the data")
  }

  return updatedData
}

export const updateData = (newTodo: TodoItem) => {
  const newList = [...loadStorageData()]
  const todoIndex = newList.findIndex((curTodo) => curTodo.id === newTodo.id)

  if (todoIndex === -1) {
    newList.push({
      ...newTodo,
      createdAt: new Date().toLocaleString(),
      id: v4(),
    })
  } else {
    newList[todoIndex] = { ...newList[todoIndex], ...newTodo }
  }

  localStorage.setItem("todo-list", JSON.stringify(newList))
}

export const toggleStatus = (todo: TodoItem) =>
  updateData({
    ...todo,
    status: todo.status === "incomplete" ? "completed" : "incomplete",
    finishedAt: todo.status === "incomplete" ? new Date().toLocaleString() : "",
  })
