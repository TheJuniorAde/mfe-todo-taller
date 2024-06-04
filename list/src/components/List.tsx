import React from "react"

import { Footer } from "host/Footer"
import { Header } from "host/Header"
import { Active } from "./Active"
import { Finished } from "./Finished"

export const List: React.FC = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="px-3 py-10 flex justify-center">
        <div className="w-full max-w-xl">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-2xl">Active tasks</p>
            <Active />
            <p className="text-2xl">Finished tasks</p>
            <Finished />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
