import React, { useEffect, useState } from "react"

import "./index.scss"
import { Form } from "./components"
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

  const updateTodoList = (todo: TodoItem) => {
    updateData(todo)
    setTodoList(loadStorageData())
  }

  return (
    <TodoContext.Provider
      value={{ list: todoList, updateData: updateTodoList, toggleStatus }}
    >
      <Form />
    </TodoContext.Provider>
  )
}
