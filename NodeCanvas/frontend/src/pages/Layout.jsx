import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

export default Layout
