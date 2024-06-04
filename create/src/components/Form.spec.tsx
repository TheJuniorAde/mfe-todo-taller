/**
 * @jest-environment jsdom
 */
import React, { createContext as mockContext } from "react"
import { fireEvent, render } from "@testing-library/react"
import { Form } from "./Form"
import { TodoContext } from "host/Context"
import { BrowserRouter } from "react-router-dom"

jest.mock("host/Header", () => ({ Header: () => <div>header</div> }), {
  virtual: true,
})
jest.mock("host/Footer", () => ({ Footer: () => <div>footer</div> }), {
  virtual: true,
})
jest.mock("host/Context", () => ({ TodoContext: mockContext({}) }), {
  virtual: true,
})

describe("Form", () => {
  it("renders correctly with submit action disabled when no description", () => {
    const { getByRole } = render(
      <BrowserRouter>
        <TodoContext.Provider
          value={{ list: [], updateData: jest.fn(), toggleStatus: jest.fn() }}
        >
          <Form />
        </TodoContext.Provider>
      </BrowserRouter>
    )

    expect(getByRole("button")).toHaveProperty("disabled", true)
  })

  it("renders correctly with submit action disabled when description is empty", () => {
    const { getByTestId, getByRole } = render(
      <BrowserRouter>
        <TodoContext.Provider
          value={{ list: [], updateData: jest.fn(), toggleStatus: jest.fn() }}
        >
          <Form />
        </TodoContext.Provider>
      </BrowserRouter>
    )

    fireEvent.change(getByTestId("todo-form-description"), {
      target: { value: " " },
    })

    expect(getByRole("button")).toHaveProperty("disabled", true)
  })

  it("renders correctly with submit action enabled when description provided", () => {
    const { getByRole, getByTestId } = render(
      <BrowserRouter>
        <TodoContext.Provider
          value={{ list: [], updateData: jest.fn(), toggleStatus: jest.fn() }}
        >
          <Form />
        </TodoContext.Provider>
      </BrowserRouter>
    )

    fireEvent.change(getByTestId("todo-form-description"), {
      target: { value: "description" },
    })

    expect(getByRole("button")).toHaveProperty("disabled", false)
  })

  it("calls correctly context function to add todo", () => {
    const mockedUpdate = jest.fn()
    const { getByRole, getByTestId } = render(
      <BrowserRouter>
        <TodoContext.Provider
          value={{
            list: [],
            updateData: mockedUpdate,
            toggleStatus: jest.fn(),
          }}
        >
          <Form />
        </TodoContext.Provider>
      </BrowserRouter>
    )

    fireEvent.change(getByTestId("todo-form-description"), {
      target: { value: "description" },
    })

    fireEvent.click(getByRole("button"))

    expect(mockedUpdate).toHaveBeenCalledWith({
      createdAt: "",
      description: "description",
      finishedAt: "",
      id: "",
      status: "incomplete",
    })
  })
})
