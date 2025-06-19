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
        isExpanded ? 'w-64 sm:w-72 md:w-80 lg:w-96' : 'w-16 sm:w-20 md:w-24'
      }`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Header */}
      <div
        className={`${
          isExpanded ? 'p-4 sm:p-6 md:p-8 lg:p-10' : 'p-2 sm:p-3 md:p-4'
        } flex justify-between items-center border-b-2 border-stone-700/50 bg-stone-800/50 backdrop-blur-sm`}
      >
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3 sm:space-x-4 md:space-x-6"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-stone-600 to-stone-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent">
                Mesh View
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show icon when collapsed */}
        <AnimatePresence mode="wait">
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center w-full"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-stone-600 to-stone-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-xl">
                <Activity className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`${
            isExpanded ? 'p-2 sm:p-3 md:p-4' : 'p-1 sm:p-2 md:p-3'
          } rounded-xl sm:rounded-2xl hover:bg-stone-700/50 transition-all duration-200 text-stone-400 hover:text-stone-200`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isExpanded ? (
            <ChevronLeft
              size={
                window.innerWidth < 640 ? 20 : window.innerWidth < 768 ? 24 : 28
              }
            />
          ) : (
            <ChevronRight
              size={
                window.innerWidth < 640 ? 20 : window.innerWidth < 768 ? 24 : 28
              }
            />
          )}
        </motion.button>
      </div>

      {/* Navigation */}
      <div
        className={`flex-1 ${
          isExpanded ? 'p-4 sm:p-6 md:p-8' : 'p-2 sm:p-3 md:p-4'
        } space-y-3 sm:space-y-4 md:space-y-6 overflow-y-auto`}
      >
        {navItems.map((item, index) => (
          <motion.button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center w-full ${
              isExpanded ? 'p-3 sm:p-4 md:p-6' : 'p-2 sm:p-3 md:p-4'
            } rounded-2xl sm:rounded-3xl transition-all duration-200 font-semibold text-sm sm:text-base md:text-lg group relative overflow-hidden ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-stone-600 to-stone-700 text-white shadow-2xl'
                : 'hover:bg-stone-700/50 text-stone-300 hover:text-stone-100'
            } ${
              isExpanded
                ? 'justify-start space-x-3 sm:space-x-4 md:space-x-6'
                : 'justify-center'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title={!isExpanded ? item.label : undefined}
          >
            {/* Active indicator */}
            {isActive(item.path) && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-stone-600/20 to-stone-700/20 rounded-2xl sm:rounded-3xl"
                layoutId="activeTab"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}

            <item.icon
              size={
                isExpanded
                  ? window.innerWidth < 640
                    ? 20
                    : window.innerWidth < 768
                    ? 24
                    : 28
                  : window.innerWidth < 640
                  ? 16
                  : window.innerWidth < 768
                  ? 20
                  : 24
              }
              className={`${
                isActive(item.path)
                  ? 'text-white'
                  : 'text-stone-400 group-hover:text-stone-200'
              } transition-colors duration-200 flex-shrink-0`}
            />

            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm sm:text-base md:text-lg font-semibold truncate"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <div
        className={`${
          isExpanded ? 'p-4 sm:p-6 md:p-8' : 'p-2 sm:p-3 md:p-4'
        } text-xs sm:text-sm md:text-base text-stone-500 border-t-2 border-stone-700/50 bg-stone-800/30 backdrop-blur-sm`}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center space-y-1 sm:space-y-2 md:space-y-3"
            >
              <p className="font-bold text-stone-300 text-sm sm:text-base md:text-lg">
                Service Mesh Visualizer
              </p>
              <p className="text-stone-600 text-xs sm:text-sm">v2.0.0</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <p className="font-bold text-stone-300 text-xs sm:text-sm md:text-base">
                SMV
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Sidebar
