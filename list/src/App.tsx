import React, { useEffect, useState } from "react"

import "./index.scss"
import { List } from "./components"
import {
  TodoContext,
  TodoItem,
  loadStorageData,
  updateData,
  toggleStatus,
} from "host/Context"

export const App = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([])

  useEffect(() => setTodoList(loadStorageData()), [])

  const toggleTodoStatus = (todo: TodoItem) => {
    toggleStatus(todo)
    setTodoList(loadStorageData())
  }

  return (
    <TodoContext.Provider
      value={{ list: todoList, updateData, toggleStatus: toggleTodoStatus }}
    >
      <List />
    </TodoContext.Provider>
  )
}
