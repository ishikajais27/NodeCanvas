// import React, { useState } from 'react'
// import { FiList, FiGrid, FiHome, FiInfo } from 'react-icons/fi'
// import { useNavigate } from 'react-router-dom'

// const Sidebar = () => {
//   const [isExpanded, setIsExpanded] = useState(true)
//   const navigate = useNavigate()

//   const navItems = [
//     { path: '/', icon: FiHome, label: 'Home' },
//     { path: '/dashboard', icon: FiGrid, label: 'Dashboard' },
//     { path: '/about', icon: FiInfo, label: 'About' },
//   ]

//   return (
//     <div
//       className={`bg-gray-800 text-white h-full transition-all duration-300 flex flex-col ${
//         isExpanded ? 'w-64' : 'w-20'
//       }`}
//     >
//       <div className="p-4 flex justify-between items-center border-b border-gray-700">
//         {isExpanded && <h2 className="text-xl font-bold">Mesh View</h2>}
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="p-2 rounded-full hover:bg-gray-700"
//         >
//           {isExpanded ? '«' : '»'}
//         </button>
//       </div>

//       <div className="flex-1 p-4 space-y-4 overflow-y-auto">
//         {navItems.map((item) => (
//           <button
//             key={item.path}
//             onClick={() => navigate(item.path)}
//             className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-700 ${
//               isExpanded ? 'justify-start space-x-3' : 'justify-center'
//             }`}
//           >
//             <item.icon size={20} />
//             {isExpanded && <span>{item.label}</span>}
//           </button>
//         ))}
//       </div>

//       <div className="p-2 text-xs text-gray-400 border-t border-gray-700">
//         {isExpanded ? 'Service Mesh Visualizer' : 'SMV'}
//       </div>
//     </div>
//   )
// }

// export default Sidebar
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Grid3X3,
  Info,
  ChevronLeft,
  ChevronRight,
  Activity,
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: Grid3X3, label: 'Dashboard' },
    { path: '/about', icon: Info, label: 'About' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.div
      className={`bg-gradient-to-b from-stone-800 to-stone-900 text-stone-100 h-full transition-all duration-300 flex flex-col border-r-2 border-stone-700 shadow-2xl ${
        isExpanded ? 'w-96' : 'w-24'
      }`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="p-10 flex justify-between items-center border-b-2 border-stone-700/50 bg-stone-800/50 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-6"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-stone-600 to-stone-700 rounded-2xl flex items-center justify-center shadow-xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent">
                Mesh View
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-4 rounded-2xl hover:bg-stone-700/50 transition-all duration-200 text-stone-400 hover:text-stone-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isExpanded ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
        </motion.button>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-8 space-y-6 overflow-y-auto">
        {navItems.map((item, index) => (
          <motion.button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center w-full p-6 rounded-3xl transition-all duration-200 font-semibold text-lg group relative overflow-hidden ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-stone-600 to-stone-700 text-white shadow-2xl'
                : 'hover:bg-stone-700/50 text-stone-300 hover:text-stone-100'
            } ${isExpanded ? 'justify-start space-x-6' : 'justify-center'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Active indicator */}
            {isActive(item.path) && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-stone-600/20 to-stone-700/20 rounded-3xl"
                layoutId="activeTab"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}

            <item.icon
              size={28}
              className={`${
                isActive(item.path)
                  ? 'text-white'
                  : 'text-stone-400 group-hover:text-stone-200'
              } transition-colors duration-200`}
            />

            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg font-semibold"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-8 text-base text-stone-500 border-t-2 border-stone-700/50 bg-stone-800/30 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center space-y-3"
            >
              <p className="font-bold text-stone-300 text-lg">
                Service Mesh Visualizer
              </p>
              <p className="text-stone-600 text-sm">v2.0.0</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <p className="font-bold text-stone-300 text-lg">SMV</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Sidebar
