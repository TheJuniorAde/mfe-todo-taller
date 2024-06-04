import React, { useContext, useState } from "react"

import { NavLink, useNavigate } from "react-router-dom"

import { Footer } from "host/Footer"
import { Header } from "host/Header"
import { TodoContext, TodoItem } from "host/Context"

export const Form: React.FC = () => {
  const navigate = useNavigate()
  const { updateData } = useContext(TodoContext)
  const [todo, setTodo] = useState<TodoItem>({
    id: "",
    description: "",
    status: "incomplete",
    createdAt: "",
    finishedAt: "",
  })

  return (
    <div className="w-full">
      <Header />
      <div className="px-3 py-10 flex justify-center">
        <div className="w-full max-w-xl">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                data-testid="todo-form-description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="description"
                onChange={({ target: { value } }) => {
                  setTodo({ ...todo, description: value })
                }}
                value={todo.description}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                disabled={!String(todo.description).trim()}
                data-testid="todo-form-submit"
                onClick={() => {
                  updateData(todo)
                  navigate("/")
                }}
              >
                Add Todo
              </button>
              <NavLink
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/"
              >
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
