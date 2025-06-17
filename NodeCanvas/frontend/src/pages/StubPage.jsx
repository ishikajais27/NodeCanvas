import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import './StubPage.css'

const StubPage = ({ title }) => {
  return (
    <div className="stub-page">
      <Sidebar />
      <div className="main-content">
        <div className="content-header">
          <h2>{title}</h2>
        </div>
        <div className="stub-content">
          <p>
            This page is a stub. In a full implementation, this would show{' '}
            {title.toLowerCase()} information.
          </p>
        </div>
      </div>
    </div>
  )
}

export default StubPage
