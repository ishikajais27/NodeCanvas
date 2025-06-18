import React, { useState } from 'react'
import Graph from '../components/Graphs/Graph'
import './Dashboard.css'

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('graph')
  const [selectedNode, setSelectedNode] = useState(null)

  return (
    <div className="main-content">
      <div className="content-header">
        <h2>Service Mesh Visualization</h2>
        {/* <div className="view-toggle">
          <button
            onClick={() => setViewMode('graph')}
            className={viewMode === 'graph' ? 'active' : ''}
          >
            Graph View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'active' : ''}
          >
            List View
          </button>
        </div> */}
      </div>

      {viewMode === 'graph' ? (
        <div className="graph-view">
          <Graph />
        </div>
      ) : (
        <div className="list-view">
          <h3>Services</h3>
          <div className="service-list">
            {/* List view content would go here */}
            <p>List view implementation would show service data</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
