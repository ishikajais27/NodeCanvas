import React, { useState } from 'react'
import { FiHome, FiSettings, FiPlus, FiMinus, FiLink } from 'react-icons/fi'
import { addNode, deleteNode } from '../../services/api'

const Sidebar = ({ onAddNode }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleAddNode = async () => {
    const newNodeId = `service-${Math.floor(Math.random() * 1000)}`
    const newNode = {
      id: newNodeId,
      name: `Service ${Math.floor(Math.random() * 1000)}`,
      latency: Math.floor(Math.random() * 200),
      errorRate: Math.random().toFixed(2),
      traffic: Math.floor(Math.random() * 50),
      x: 100 + Math.random() * 300,
      y: 100 + Math.random() * 300,
    }

    try {
      await addNode(newNode)
      onAddNode(newNode)
    } catch (error) {
      console.error('Error adding node:', error)
    }
  }

  return (
    <div
      className={`bg-gray-800 text-white h-full transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        {isExpanded && <h2 className="text-xl font-bold">NodeCanvas</h2>}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          {isExpanded ? '«' : '»'}
        </button>
      </div>

      <div className="p-4 space-y-4">
        <button
          onClick={handleAddNode}
          className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-700 ${
            isExpanded ? 'justify-start space-x-3' : 'justify-center'
          }`}
        >
          <FiPlus size={20} />
          {isExpanded && <span>Add Node</span>}
        </button>

        <button
          className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-700 ${
            isExpanded ? 'justify-start space-x-3' : 'justify-center'
          }`}
        >
          <FiMinus size={20} />
          {isExpanded && <span>Remove Node</span>}
        </button>

        <button
          className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-700 ${
            isExpanded ? 'justify-start space-x-3' : 'justify-center'
          }`}
        >
          <FiLink size={20} />
          {isExpanded && <span>Add Connection</span>}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <button
          className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-700 ${
            isExpanded ? 'justify-start space-x-3' : 'justify-center'
          }`}
        >
          <FiSettings size={20} />
          {isExpanded && <span>Settings</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
// import React from 'react'
// import { FiPlus, FiTrash2 } from 'react-icons/fi'

// const Sidebar = ({ onAddNode, onDeleteNode, selectedNode }) => {
//   return (
//     <div
//       style={{
//         width: 250,
//         background: '#f8fafc',
//         borderRight: '1px solid #e2e8f0',
//         padding: 16,
//         height: '100%',
//       }}
//     >
//       <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
//         Node Controls
//       </h2>

//       <button
//         onClick={onAddNode}
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: 8,
//           width: '100%',
//           padding: '8px 12px',
//           background: '#6366f1',
//           color: 'white',
//           border: 'none',
//           borderRadius: 4,
//           marginBottom: 8,
//           cursor: 'pointer',
//         }}
//       >
//         <FiPlus size={16} />
//         Add Node
//       </button>

//       <button
//         onClick={() => selectedNode && onDeleteNode(selectedNode.id)}
//         disabled={!selectedNode}
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: 8,
//           width: '100%',
//           padding: '8px 12px',
//           background: selectedNode ? '#ef4444' : '#d1d5db',
//           color: 'white',
//           border: 'none',
//           borderRadius: 4,
//           cursor: selectedNode ? 'pointer' : 'not-allowed',
//         }}
//       >
//         <FiTrash2 size={16} />
//         Delete Node
//       </button>
//     </div>
//   )
// }

// export default Sidebar
