import React, { useContext, useMemo } from "react"
import { TodoContext } from "host/Context"
import { Item } from "./Item"
import { EmptyList } from "./EmptyList"

export const Finished: React.FC = () => {
  const context = useContext(TodoContext)
  const finishedItems = useMemo(
    () => context.list.filter((todo) => todo.status === "completed"),
    [context.list]
  )

  if (!context.list.length || !finishedItems.length) return <EmptyList />

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {finishedItems.map((todo) => (
        <Item key={todo.id} todo={todo} updateTodo={context.toggleStatus} />
      ))}
    </ul>
  )
}
