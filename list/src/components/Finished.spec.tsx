/**
 * @jest-environment jsdom
 */
import React, { createContext as mockContext } from "react"
import { render, fireEvent } from "@testing-library/react"
import { Finished } from "./Finished"
import { TodoContext, TodoItem } from "host/Context"

jest.mock("host/Context", () => ({ TodoContext: mockContext({}) }), {
  virtual: true,
})

const mockedItem: TodoItem = {
  description: "description",
  id: "id",
  finishedAt: new Date().toLocaleString("en-US"),
  createdAt: "",
  status: "completed",
}

describe("Finished", () => {
  it("renders correctly without tasks", () => {
    const { container } = render(
      <TodoContext.Provider
        value={{ list: [], updateData: jest.fn(), toggleStatus: jest.fn() }}
      >
        <Finished />
      </TodoContext.Provider>
    )

    expect(container.parentElement).toMatchSnapshot()
  })

  it("renders correctly without completed tasks", () => {
    const { container } = render(
      <TodoContext.Provider
        value={{
          list: [{ ...mockedItem, status: "incomplete" }],
          updateData: jest.fn(),
          toggleStatus: jest.fn(),
        }}
      >
        <Finished />
      </TodoContext.Provider>
    )

    expect(container.parentElement).toMatchSnapshot()
  })

  it("renders correctly with completed tasks", () => {
    const { container } = render(
      <TodoContext.Provider
        value={{
          list: [mockedItem],
          updateData: jest.fn(),
          toggleStatus: jest.fn(),
        }}
      >
        <Finished />
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
        <Finished />
      </TodoContext.Provider>
    )

    fireEvent.click(getByTestId("list-item-label-id"))

    expect(toggleMock).toHaveBeenCalledWith(mockedItem)
  })
})
