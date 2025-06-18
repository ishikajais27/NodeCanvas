import React, { useState } from 'react'
import { FiList, FiGrid, FiHome, FiInfo } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const navigate = useNavigate()

  const navItems = [
    { path: '/', icon: FiHome, label: 'Home' },
    { path: '/dashboard', icon: FiGrid, label: 'Dashboard' },
    { path: '/about', icon: FiInfo, label: 'About' },
  ]

  return (
    <div
      className={`bg-gray-800 text-white h-full transition-all duration-300 flex flex-col ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        {isExpanded && <h2 className="text-xl font-bold">Mesh View</h2>}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          {isExpanded ? '«' : '»'}
        </button>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-700 ${
              isExpanded ? 'justify-start space-x-3' : 'justify-center'
            }`}
          >
            <item.icon size={20} />
            {isExpanded && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      <div className="p-2 text-xs text-gray-400 border-t border-gray-700">
        {isExpanded ? 'Service Mesh Visualizer' : 'SMV'}
      </div>
    </div>
  )
}

export default Sidebar
