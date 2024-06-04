import React from "react"
import { NavLink } from "react-router-dom"

export const Header: React.FC = () => (
  <div className="p-5 bg-blue-500 text-white -text-3xl font-bold">
    <NavLink
      data-testid="to-list"
      className="px-3 inline-block align-baseline font-bold text-sm"
      to="/"
    >
      List All Todo
    </NavLink>
    <NavLink
      data-testid="to-form"
      className="px-3 inline-block align-baseline font-bold text-sm"
      to="/create"
    >
      Create Todo Item
    </NavLink>
  </div>
)
