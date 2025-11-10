import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Syringe,
  MapPin,
  Bell,
  MessageSquare,
  Bot,
  Settings,
  X
} from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/app', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/app/children', icon: Users, label: 'Children' },
    { path: '/app/tracker', icon: Syringe, label: 'Vaccination Tracker' },
    { path: '/app/clinics', icon: MapPin, label: 'Clinic Finder' },
    { path: '/app/reminders', icon: Bell, label: 'Reminders' },
    { path: '/app/ai-assistant', icon: Bot, label: 'AI Assistant' },
    { path: '/app/chat', icon: MessageSquare, label: 'Live Chat' },
    { path: '/app/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-blue-800">
            <h2 className="text-lg font-semibold">VaxTrack</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded hover:bg-blue-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`
                  }
                  end
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar