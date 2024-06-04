import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { App as MfeCreate } from "create/MfeCreate"
import { App as MfeList } from "list/MfeList"

import "./index.scss"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={"Loading"}>
              <MfeList />
            </Suspense>
          }
        />
        <Route
          path="/create"
          element={
            <Suspense fallback={"Loading"}>
              <MfeCreate />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
