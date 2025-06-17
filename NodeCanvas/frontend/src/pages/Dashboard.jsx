import React, { useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Graph from '../components/Graphs/Graph'
import './Dashboard.css'

const Dashboard = ({ graphData, setGraphData }) => {
  const [activeTab, setActiveTab] = useState('graph')
  const [newNodeName, setNewNodeName] = useState('')
  const [newNodeType, setNewNodeType] = useState('backend')
  const [edgeSource, setEdgeSource] = useState('')
  const [edgeTarget, setEdgeTarget] = useState('')

  const addNode = async () => {
    if (!newNodeName.trim()) return

    const newNode = {
      name: newNodeName,
      type: newNodeType,
      traffic: Math.floor(Math.random() * 50) + 10,
      errorRate: Math.random().toFixed(2),
      latency: Math.floor(Math.random() * 200) + 50,
      x: Math.random() * 500,
      y: Math.random() * 500,
    }

    try {
      const response = await fetch('/api/nodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNode),
      })

      const data = await response.json()
      setGraphData((prev) => ({
        ...prev,
        nodes: [...prev.nodes, data],
      }))
      setNewNodeName('')
    } catch (error) {
      console.error('Error adding node:', error)
    }
  }

  const addEdge = async () => {
    if (!edgeSource || !edgeTarget || edgeSource === edgeTarget) return

    const newEdge = {
      source: edgeSource,
      target: edgeTarget,
      traffic: Math.floor(Math.random() * 50) + 10,
      protocol: Math.random() > 0.5 ? 'HTTP' : 'gRPC',
    }

    try {
      const response = await fetch('/api/edges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEdge),
      })

      const data = await response.json()
      setGraphData((prev) => ({
        ...prev,
        edges: [...prev.edges, data],
      }))
      setEdgeSource('')
      setEdgeTarget('')
    } catch (error) {
      console.error('Error adding edge:', error)
    }
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="content-header">
          <h2>Service Mesh Visualization</h2>
          <div className="tabs">
            <button
              className={activeTab === 'graph' ? 'active' : ''}
              onClick={() => setActiveTab('graph')}
            >
              Graph View
            </button>
            <button
              className={activeTab === 'list' ? 'active' : ''}
              onClick={() => setActiveTab('list')}
            >
              List View
            </button>
          </div>
        </div>

        {activeTab === 'graph' ? (
          <div className="graph-view">
            <Graph graphData={graphData} setGraphData={setGraphData} />
          </div>
        ) : (
          <div className="list-view">
            <h3>Services</h3>
            <ul>
              {graphData.nodes.map((node) => (
                <li key={node.id}>
                  <span
                    className="node-color"
                    style={{ backgroundColor: getNodeColor(node.type) }}
                  ></span>
                  {node.name} - {node.type} (Traffic: {node.traffic}%)
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="controls">
          <div className="control-group">
            <h4>Add Node</h4>
            <input
              type="text"
              placeholder="Node name"
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}
            />
            <select
              value={newNodeType}
              onChange={(e) => setNewNodeType(e.target.value)}
            >
              <option value="backend">Backend</option>
              <option value="frontend">Frontend</option>
              <option value="gateway">Gateway</option>
              <option value="database">Database</option>
            </select>
            <button onClick={addNode}>Add Node</button>
          </div>

          <div className="control-group">
            <h4>Add Edge</h4>
            <select
              value={edgeSource}
              onChange={(e) => setEdgeSource(e.target.value)}
            >
              <option value="">Select source</option>
              {graphData.nodes.map((node) => (
                <option key={`source-${node.id}`} value={node.id}>
                  {node.name}
                </option>
              ))}
            </select>
            <select
              value={edgeTarget}
              onChange={(e) => setEdgeTarget(e.target.value)}
            >
              <option value="">Select target</option>
              {graphData.nodes.map((node) => (
                <option key={`target-${node.id}`} value={node.id}>
                  {node.name}
                </option>
              ))}
            </select>
            <button onClick={addEdge}>Add Edge</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const getNodeColor = (type) => {
  const colors = {
    frontend: '#4e79a7',
    backend: '#e15759',
    gateway: '#f28e2b',
    database: '#76b7b2',
    default: '#59a14f',
  }
  return colors[type] || colors.default
}

export default Dashboard
