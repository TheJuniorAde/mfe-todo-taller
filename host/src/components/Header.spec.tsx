/**
 * @jest-environment jsdom
 */
import React from "react"
import { render } from "@testing-library/react"
import { Header } from "./Header"
import { TodoContext } from "../utils"
import { BrowserRouter } from "react-router-dom"

describe("Header", () => {
  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <TodoContext.Provider
          value={{ list: [], updateData: jest.fn(), toggleStatus: jest.fn() }}
        >
          <Header />
        </TodoContext.Provider>
      </BrowserRouter>
    )

    expect(container.parentElement).toMatchSnapshot()
  })
})
