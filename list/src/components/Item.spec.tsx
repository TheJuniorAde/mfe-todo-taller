/**
 * @jest-environment jsdom
 */
import React from "react"
import { render } from "@testing-library/react"
import { Item } from "./Item"

describe("Item", () => {
  it("renders correctly when incomplete", () => {
    const { container } = render(
      <Item
        todo={{
          description: "test",
          id: "",
          createdAt: new Date().toLocaleString("en-US"),
          finishedAt: "",
          status: "incomplete",
        }}
        updateTodo={jest.fn()}
      />
    )

    expect(container.parentElement).toMatchSnapshot()
  })

  it("renders correctly when completed", () => {
    const { container } = render(
      <Item
        todo={{
          description: "test",
          id: "",
          createdAt: "",
          finishedAt: new Date().toLocaleString("en-US"),
          status: "completed",
        }}
        updateTodo={jest.fn()}
      />
    )

    expect(container.parentElement).toMatchSnapshot()
  })
})
