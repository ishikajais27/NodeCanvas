import React, { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Graph from './components/Graphs/Graph'
import './App.css'

function App() {
  const [nodes, setNodes] = useState([])

  const handleAddNode = (newNode) => {
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: newNode.id,
        data: { label: newNode.name },
        position: { x: newNode.x, y: newNode.y },
        style: {
          border: '2px solid #6366f1',
          borderRadius: '10px',
          padding: '10px',
          backgroundColor: 'white',
          width: '150px',
        },
      },
    ])
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onAddNode={handleAddNode} />
      <div className="flex-1">
        <Graph />
      </div>
    </div>
  )
}

export default App
