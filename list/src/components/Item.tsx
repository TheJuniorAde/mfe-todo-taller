import React from "react"

import { TodoItem } from "host/Context"

interface ItemProps {
  todo: TodoItem
  updateTodo: (item: TodoItem) => void
}

export const Item: React.FC<ItemProps> = ({ todo, updateTodo }) => {
  const isActive = todo.status === "incomplete"
  const getStatusClassName = (status: TodoItem["status"]) =>
    `rounded-full ${
      status === "completed" ? "bg-emerald-500/50" : "bg-rose-700/50"
    }`

  return (
    <li
      data-testid={`list-item-${todo.id}`}
      key={todo.id}
      className="flex justify-between gap-x-6 px-5 py-5 hover:bg-gray-100 hover:cursor-pointer"
    >
      <label
        data-testid={`list-item-label-${todo.id}`}
        className="flex justify-between w-full hover:cursor-pointer"
      >
        <div className="flex min-w-0 gap-x-4">
          <input
            checked={!isActive}
            onChange={() => updateTodo(todo)}
            className="mr-2 leading-tight"
            type="checkbox"
          />
          <div className="min-w-0 flex-auto">
            <p
              className={`text-sm font-semibold leading-6 text-gray-900 ${
                !isActive && "line-through"
              }`}
            >
              {todo.description}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {isActive
                ? `Created at ${todo.createdAt}`
                : `Finished at ${todo.finishedAt}`}
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-center">
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className={`flex-none ${getStatusClassName(todo.status)} p-1`}>
              <div
                className={`h-5 w-5 ${getStatusClassName(todo.status)}`}
              ></div>
            </div>
            <p className="text-xs leading-5 text-gray-500">{todo.status}</p>
          </div>
        </div>
      </label>
    </li>
  )
}
