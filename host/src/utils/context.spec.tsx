/**
 * @jest-environment jsdom
 */
import React, { useContext, useEffect, useState } from "react"
import { fireEvent, render } from "@testing-library/react"
import {
  TodoContext,
  loadStorageData,
  toggleStatus,
  updateData,
} from "./context"
import { TodoItem } from "./types"

const mockItem: TodoItem = {
  description: "description",
  createdAt: "",
  finishedAt: "",
  status: "completed",
  id: "id-1",
}

jest.mock("uuid", () => ({ v4: jest.fn(() => "id-2") }))

const mockGetItem = jest.fn(() => JSON.stringify([mockItem]))
const mockSetItem = jest.fn()
const mockRemoveItem = jest.fn()
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: (..._: string[]) => mockGetItem(),
    setItem: (...args: string[]) => mockSetItem(...args),
    removeItem: (...args: string[]) => mockRemoveItem(...args),
  },
})

const MockWrapper = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([])

  useEffect(() => setTodoList(loadStorageData()), [])

  const toggleTodoStatus = (todo: TodoItem) => {
    toggleStatus(todo)
    setTodoList(loadStorageData())
  }

  const updateTodo = (todo: TodoItem) => {
    updateData(todo)
    setTodoList(loadStorageData())
  }

  return (
    <TodoContext.Provider
      value={{
        list: todoList,
        updateData: updateTodo,
        toggleStatus: toggleTodoStatus,
      }}
    >
      <MockComponent />
    </TodoContext.Provider>
  )
}

const MockComponent = () => {
  const context = useContext(TodoContext)

  return (
    <>
      <ul>
        {context.list.map((todo) => (
          <li key={todo.id}>
            <button
              data-testid="toggle-status"
              onClick={() => context.toggleStatus(todo)}
            >
              toggle status
            </button>
          </li>
        ))}
      </ul>
      <button
        data-testid="create-todo"
        onClick={() =>
          context.updateData({
            ...context.list[0],
            id: "id-2",
            status: "incomplete",
          })
        }
      >
        create todo
      </button>
    </>
  )
}

jest.useFakeTimers().setSystemTime(new Date("2020-01-01"))

describe("TodoContext", () => {
  beforeEach(() => {
    mockGetItem.mockClear()
    mockSetItem.mockClear()
  })

  it("renders correctly", () => {
    const { container, getByTestId } = render(<MockWrapper />)

    expect(container.parentElement).toMatchSnapshot()

    fireEvent.click(getByTestId("create-todo"))
    fireEvent.click(getByTestId("toggle-status"))

    expect(mockSetItem).toHaveBeenNthCalledWith(
      1,
      "todo-list",
      '[{"description":"description","createdAt":"","finishedAt":"","status":"completed","id":"id-1"},{"description":"description","createdAt":"31/12/2019, 21:00:00","finishedAt":"","status":"incomplete","id":"id-2"}]'
    )

    expect(mockSetItem).toHaveBeenNthCalledWith(
      2,
      "todo-list",
      '[{"description":"description","createdAt":"","finishedAt":"","status":"incomplete","id":"id-1"}]'
    )
  })
})
