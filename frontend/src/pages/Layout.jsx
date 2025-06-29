'use client'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar/Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 overflow-hidden">
      <Sidebar />
      <motion.main
        className="flex-1 overflow-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="h-full w-full">{children}</div>
      </motion.main>
    </div>
  )
}

export default Layout
