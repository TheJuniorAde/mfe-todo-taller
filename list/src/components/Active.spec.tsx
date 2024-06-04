/**
 * @jest-environment jsdom
 */
import React, { createContext as mockContext } from "react"
import { render, fireEvent } from "@testing-library/react"
import { Active } from "./Active"
import { TodoContext, TodoItem } from "host/Context"

jest.mock("host/Context", () => ({ TodoContext: mockContext({}) }), {
  virtual: true,
})

const mockedItem: TodoItem = {
  description: "description",
  id: "id",
  finishedAt: "",
  createdAt: new Date().toLocaleString("en-US"),
  status: "incomplete",
}

describe("Active", () => {
  it("renders correctly without tasks", () => {
    const { container } = render(
      <TodoContext.Provider
        value={{ list: [], updateData: jest.fn(), toggleStatus: jest.fn() }}
      >
        <Active />
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
        <Active />
      </TodoContext.Provider>
    )

    expect(container.parentElement).toMatchSnapshot()
  })

  it("renders correctly with incomplete tasks", () => {
    const { container } = render(
      <TodoContext.Provider
        value={{
          list: [mockedItem],
          updateData: jest.fn(),
          toggleStatus: jest.fn(),
        }}
      >
        <Active />
      </TodoContext.Provider>
    )

    expect(container.parentElement).toMatchSnapshot()
  })

  it("calls toggle functions", () => {
    const toggleMock = jest.fn()

    const { getByTestId } = render(
      <TodoContext.Provider
        value={{
          list: [mockedItem],
          updateData: jest.fn(),
          toggleStatus: toggleMock,
        }}
      >
        <Active />
      </TodoContext.Provider>
    )

    fireEvent.click(getByTestId("list-item-label-id"))

    expect(toggleMock).toHaveBeenCalledWith(mockedItem)
  })
})
