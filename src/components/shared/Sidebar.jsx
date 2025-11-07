import React from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import {
  AnalyticIcon,
  AnalyticPrimIcon,
  CogIcon,
  CogPrimIcon,
  DashboardIcon,
  DashboardPrimIcon,
  LogoIcon,
  LogoutSideIcon,
  MessageIcon,
  MessagePrimIcon,
  RequestIcon,
  RequestPrimIcon,
  UsersIcon,
  UsersPrimIcon,
} from '@/assets/icons'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    {
      firstIcon: DashboardPrimIcon,
      secondIcon: DashboardIcon,
      label: 'Dashboard',
      path: '/dashboard',
      color: 'text-gray-600',
    },
    {
      firstIcon: RequestIcon,
      secondIcon: RequestPrimIcon,
      label: 'Requests',
      path: '/request',
      color: 'text-gray-600',
    },
    {
      firstIcon: MessageIcon,
      secondIcon: MessagePrimIcon,
      label: 'Messaging',
      path: '/messaging',
      color: 'text-gray-600',
    },
    {
      firstIcon: AnalyticIcon,
      secondIcon: AnalyticPrimIcon,
      label: 'Analytics',
      path: '/analytics',
      color: 'text-gray-600',
    },
    {
      firstIcon: UsersIcon,
      secondIcon: UsersPrimIcon,
      label: 'User Management',
      path: '/users',
      color: 'text-gray-600',
    },
    {
      firstIcon: CogIcon,
      secondIcon: CogPrimIcon,
      label: 'Settings',
      path: '/settings',
      color: 'text-gray-600',
    },
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
            // Check if current path starts with the menu item path
            const isActive = location.pathname.startsWith(item.path)
            const Icon = isActive ? item.secondIcon : item.firstIcon

            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-primary'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-500'}`}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
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