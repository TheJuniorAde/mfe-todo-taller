/**
 * @jest-environment jsdom
 */
import React, { createContext as mockContext } from "react"
import { render } from "@testing-library/react"
import { List } from "./List"
import { TodoContext, TodoItem } from "host/Context"

jest.mock("host/Header", () => ({ Header: () => <div>header</div> }), {
  virtual: true,
})
jest.mock("host/Footer", () => ({ Footer: () => <div>footer</div> }), {
  virtual: true,
})
jest.mock("host/Context", () => ({ TodoContext: mockContext({}) }), {
  virtual: true,
})

const mockedItem: TodoItem = {
  description: "description",
  id: "id",
  finishedAt: new Date().toLocaleString("en-US"),
  createdAt: new Date().toLocaleString("en-US"),
  status: "incomplete",
}

describe("List", () => {
  it("renders correctly without tasks", () => {
    const { container } = render(
      <TodoContext.Provider
        value={{ list: [], updateData: jest.fn(), toggleStatus: jest.fn() }}
      >
        <List />
      </TodoContext.Provider>
    )

    expect(container.parentElement).toMatchSnapshot()
  })

  it("renders correctly without incomplete tasks", () => {
    const { container } = render(
      <TodoContext.Provider
        value={{
          list: [{ ...mockedItem, status: "completed" }],
          updateData: jest.fn(),
          toggleStatus: jest.fn(),
        }}
      >
        <List />
      </TodoContext.Provider>
    )

    expect(container.parentElement).toMatchSnapshot()
  })

  it("renders correctly without completed tasks", () => {
    const { container } = render(
      <TodoContext.Provider
        value={{
          list: [mockedItem],
          updateData: jest.fn(),
          toggleStatus: jest.fn(),
        }}
      >
        <List />
      </TodoContext.Provider>
    )

    expect(container.parentElement).toMatchSnapshot()
  })

  it("renders correctly with both completed and incomplete tasks", () => {
    const { container } = render(
      <TodoContext.Provider
        value={{
          list: [
            mockedItem,
            { ...mockedItem, status: "completed", id: "id-2" },
          ],
          updateData: jest.fn(),
          toggleStatus: jest.fn(),
        }}
      >
        <List />
      </TodoContext.Provider>
    )

    expect(container.parentElement).toMatchSnapshot()
  })
})
