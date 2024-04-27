import MobileHeader from "@/components/mobile-header"
import Sidebar from "@/components/sidebar"
import React from "react"

type Props = {
  children: React.ReactNode
}

const MainLayout = ({ children }:Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />

      <main className="lg:pl-64 h-full pt-12 lg:pt-0">
        <div className="h-full max-w-5xl mx-auto pt-6">
          {children}
        </div>
      </main>
    </>
  )
}

export default MainLayout