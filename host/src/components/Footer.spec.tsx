/**
 * @jest-environment jsdom
 */
import React from "react"
import { render } from "@testing-library/react"
import { Footer } from "./Footer"
import { TodoContext } from "../utils"
import { BrowserRouter } from "react-router-dom"

describe("Footer", () => {
  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <TodoContext.Provider
          value={{ list: [], updateData: jest.fn(), toggleStatus: jest.fn() }}
        >
          <Footer />
        </TodoContext.Provider>
      </BrowserRouter>
    )

    expect(container.parentElement).toMatchSnapshot()
  })
})
