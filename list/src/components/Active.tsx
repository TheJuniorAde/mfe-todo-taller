import React, { useContext, useMemo } from "react"
import { TodoContext } from "host/Context"
import { Item } from "./Item"
import { EmptyList } from "./EmptyList"

export const Active: React.FC = () => {
  const context = useContext(TodoContext)
  const activeItems = useMemo(
    () => context.list.filter((todo) => todo.status === "incomplete"),
    [context.list]
  )

  if (!context.list.length || !activeItems.length) return <EmptyList active />

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {activeItems.map((todo) => (
        <Item key={todo.id} todo={todo} updateTodo={context.toggleStatus} />
      ))}
    </ul>
  )
}
