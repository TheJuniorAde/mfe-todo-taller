import React from "react"

interface EmptyListProps {
  active?: boolean
}

export const EmptyList: React.FC<EmptyListProps> = ({ active = false }) => (
  <ul role="list" className="divide-y divide-gray-100">
    <li className="flex justify-between gap-x-6 px-5 py-5 hover:bg-gray-100 ">
      <p className="block text-gray-700 text-sm font-bold">
        {active ? "No active tasks" : "No finished tasks"}
      </p>
    </li>
  </ul>
)
