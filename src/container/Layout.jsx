import { Outlet } from '@tanstack/react-router'
import { Header } from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'

export default function Layout() {
  
  return (
    <div className="flex min-h-screen w-full">
      
      <div>
        <Sidebar />
      </div>
      
      {/* Main content area on the right */}
      <div className="flex flex-col flex-1 min-h-screen ">
        <Header />
        <main className="flex-1 p-6 w-full bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}