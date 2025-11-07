import React, { useState } from 'react'
import {
  Home,
  FileText,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  LogOut,
} from 'lucide-react'
import {
  AnalyticIcon,
  CogIcon,
  DashboardIcon,
  LogoIcon,
  LogoutSideIcon,
  MessageIcon,
  RequestIcon,
  UsersIcon,
} from '@/assets/icons'

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard')

  const menuItems = [
    { icon: DashboardIcon, label: 'Dashboard', color: 'text-orange-500' },
    { icon: RequestIcon, label: 'Requests', color: 'text-gray-600' },
    { icon: MessageIcon, label: 'Messaging', color: 'text-gray-600' },
    { icon: AnalyticIcon, label: 'Analytics', color: 'text-gray-600' },
    { icon: UsersIcon, label: 'User Management', color: 'text-gray-600' },
    { icon: CogIcon, label: 'Settings', color: 'text-gray-600' },
  ]

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 flex justify-center border-b h-20 border-gray-100">
        <LogoIcon className="" />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-2 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.label

            return (
              <li key={item.label}>
                <button
                  onClick={() => setActiveItem(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-orange-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? 'text-orange-500' : 'text-gray-500'}`}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-gray-100">
        <div className="my-4 -mt-4 border-t"></div>
        <button className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
          <LogoutSideIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
