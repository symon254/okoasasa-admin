import { Outlet } from '@tanstack/react-router'
import { Header } from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background w-full">
      {/* Fixed Sidebar */}
      <div className="shrink-0">
        <Sidebar />
      </div>
      
      {/* Scrollable Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-brand-bg-2 p-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}