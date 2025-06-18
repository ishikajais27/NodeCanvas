// import React, { useEffect, useState, useCallback } from 'react'
// import ReactFlow, {
//   Background,
//   Controls,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   MarkerType,
// } from 'reactflow'
// import 'reactflow/dist/style.css'
// import {
//   fetchGraphData,
//   updateNode,
//   addEdge as addEdgeAPI,
//   deleteEdge as deleteEdgeAPI,
//   addNode as addNodeAPI,
//   deleteNode as deleteNodeAPI,
// } from '../../services/api'
// import Tooltip from '../Tooltip/Tooltip'

// const Graph = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([])
//   const [edges, setEdges, onEdgesChange] = useEdgesState([])
//   const [hoveredElement, setHoveredElement] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedElement, setSelectedElement] = useState(null)
//   const [connectionMode, setConnectionMode] = useState(false)
//   const [connectionStartNode, setConnectionStartNode] = useState(null)

//   // Load initial data
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const data = await fetchGraphData()
//         updateGraphData(data)
//         setIsLoading(false)
//       } catch (error) {
//         console.error('Error loading graph data:', error)
//         setIsLoading(false)
//       }
//     }

//     loadData()
//   }, [])

//   const updateGraphData = (data) => {
//     const formattedNodes = data.nodes.map((node) => ({
//       id: node.id,
//       data: {
//         label: node.name,
//         type: node.type,
//         traffic: node.traffic,
//         errorRate: node.errorRate,
//         latency: node.latency,
//       },
//       position: { x: node.x || 100, y: node.y || 100 },
//       style: {
//         border: '2px solid #6366f1',
//         borderRadius: '10px',
//         padding: '10px',
//         backgroundColor: 'white',
//         width: '150px',
//       },
//     }))

//     const formattedEdges = data.edges.map((edge) => ({
//       id: edge.id || `e${edge.source}-${edge.target}`,
//       source: edge.source,
//       target: edge.target,
//       animated: true,
//       markerEnd: { type: MarkerType.ArrowClosed },
//       label: `${edge.traffic || 10}%`,
//       style: {
//         strokeWidth: 2,
//         stroke: getEdgeColor(edge.errorRate || 0),
//       },
//       data: {
//         protocol: edge.protocol || 'HTTP',
//         errorRate: edge.errorRate || 0,
//         rps: edge.rps || 0,
//       },
//     }))

//     setNodes(formattedNodes)
//     setEdges(formattedEdges)
//   }

//   const getEdgeColor = (errorRate) => {
//     return errorRate > 0.1
//       ? '#ff4d4f'
//       : errorRate > 0.05
//       ? '#faad14'
//       : '#52c41a'
//   }

//   const onNodeDragStop = useCallback(async (event, node) => {
//     try {
//       await updateNode(node.id, { x: node.position.x, y: node.position.y })
//     } catch (error) {
//       console.error('Error updating node position:', error)
//     }
//   }, [])

//   const onConnect = useCallback(async (connection) => {
//     try {
//       const newEdge = {
//         source: connection.source,
//         target: connection.target,
//         traffic: 10,
//         protocol: 'HTTP',
//         errorRate: Math.random().toFixed(2),
//       }

//       const createdEdge = await addEdgeAPI(newEdge)

//       setEdges((eds) =>
//         addEdge(
//           {
//             ...connection,
//             id: createdEdge.id,
//             animated: true,
//             markerEnd: { type: MarkerType.ArrowClosed },
//             label: `${createdEdge.traffic}%`,
//             style: {
//               strokeWidth: 2,
//               stroke: getEdgeColor(createdEdge.errorRate),
//             },
//             data: {
//               protocol: createdEdge.protocol,
//               errorRate: createdEdge.errorRate,
//               rps: createdEdge.rps,
//             },
//           },
//           eds
//         )
//       )
//     } catch (error) {
//       console.error('Error adding edge:', error)
//     }
//   }, [])

//   const handleAddNode = useCallback(async () => {
//     try {
//       const newNode = {
//         name: `Service-${Math.floor(Math.random() * 1000)}`,
//         type: ['backend', 'frontend', 'database', 'gateway'][
//           Math.floor(Math.random() * 4)
//         ],
//         traffic: Math.floor(Math.random() * 50) + 10,
//         errorRate: Math.random().toFixed(2),
//         latency: Math.floor(Math.random() * 200) + 50,
//         x: Math.random() * 500,
//         y: Math.random() * 500,
//       }

//       const createdNode = await addNodeAPI(newNode)

//       // Refresh the entire graph to ensure we get any auto-created connections
//       const updatedGraphData = await fetchGraphData()
//       updateGraphData(updatedGraphData)
//     } catch (error) {
//       console.error('Error adding node:', error)
//     }
//   }, [])

//   const handleAddConnection = useCallback(async () => {
//     setConnectionMode(true)
//   }, [])

//   const handleNodeClick = useCallback(
//     (event, node) => {
//       if (connectionMode) {
//         if (!connectionStartNode) {
//           setConnectionStartNode(node)
//         } else {
//           // Create connection between start node and clicked node
//           onConnect({
//             source: connectionStartNode.id,
//             target: node.id,
//           })
//           setConnectionStartNode(null)
//           setConnectionMode(false)
//         }
//       } else {
//         setSelectedElement({ type: 'node', data: node })
//       }
//     },
//     [connectionMode, connectionStartNode, onConnect]
//   )

//   const handleEdgeClick = useCallback((event, edge) => {
//     setSelectedElement({ type: 'edge', data: edge })
//   }, [])

//   const handleDeleteSelected = useCallback(async () => {
//     if (!selectedElement) return

//     try {
//       if (selectedElement.type === 'node') {
//         await deleteNodeAPI(selectedElement.data.id)
//         // Refresh graph data after deletion
//         const updatedGraphData = await fetchGraphData()
//         updateGraphData(updatedGraphData)
//       } else if (selectedElement.type === 'edge') {
//         await deleteEdgeAPI(
//           selectedElement.data.source,
//           selectedElement.data.target
//         )
//         setEdges((eds) =>
//           eds.filter((edge) => edge.id !== selectedElement.data.id)
//         )
//       }
//       setSelectedElement(null)
//     } catch (error) {
//       console.error('Error deleting element:', error)
//     }
//   }, [selectedElement])

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-full">
//         Loading graph...
//       </div>
//     )
//   }

//   return (
//     <div className="w-full h-full relative">
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onNodeDragStop={onNodeDragStop}
//         onNodeClick={handleNodeClick}
//         onEdgeClick={handleEdgeClick}
//         onPaneClick={() => {
//           setConnectionStartNode(null)
//           setConnectionMode(false)
//           setSelectedElement(null)
//         }}
//         fitView
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>

//       <div className="absolute top-4 right-4 flex space-x-2">
//         <button
//           onClick={handleAddNode}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add Node
//         </button>
//         <button
//           onClick={handleAddConnection}
//           className={`px-4 py-2 rounded ${
//             connectionMode
//               ? 'bg-green-600 text-white'
//               : 'bg-blue-500 hover:bg-blue-600 text-white'
//           }`}
//         >
//           {connectionMode ? 'Connecting...' : 'Add Connection'}
//         </button>
//         <button
//           onClick={handleDeleteSelected}
//           disabled={!selectedElement}
//           className={`px-4 py-2 rounded ${
//             selectedElement
//               ? 'bg-red-500 hover:bg-red-600 text-white'
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           Delete Selected
//         </button>
//         {connectionMode && connectionStartNode && (
//           <div className="bg-white p-2 rounded shadow">
//             Connecting from: {connectionStartNode.data.label}
//           </div>
//         )}
//       </div>

//       {hoveredElement && <Tooltip element={hoveredElement} />}
//     </div>
//   )
// }

// export default Graph
import React, { useEffect, useState, useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import {
  fetchGraphData,
  updateNode,
  addEdge as addEdgeAPI,
  deleteEdge as deleteEdgeAPI,
  addNode as addNodeAPI,
  deleteNode as deleteNodeAPI,
} from '../../services/api'
import Tooltip from '../Tooltip/Tooltip'

const Graph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [hoveredElement, setHoveredElement] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedElement, setSelectedElement] = useState(null)
  const [connectionMode, setConnectionMode] = useState(false)
  const [connectionStartNode, setConnectionStartNode] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphData()
        updateGraphData(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading graph data:', error)
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const updateGraphData = (data) => {
    const formattedNodes = data.nodes.map((node) => ({
      id: node.id,
      data: {
        label: node.name,
        type: node.type,
        traffic: node.traffic,
        errorRate: node.errorRate,
        latency: node.latency,
      },
      position: { x: node.x || 100, y: node.y || 100 },
      style: {
        border: '2px solid #6366f1',
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: 'white',
        width: '150px',
      },
    }))

    const formattedEdges = data.edges.map((edge) => ({
      id: edge.id || `e${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      label: `${edge.traffic || 10}%`,
      style: {
        strokeWidth: 2,
        stroke: getEdgeColor(edge.errorRate || 0),
      },
      data: {
        protocol: edge.protocol || 'HTTP',
        errorRate: edge.errorRate || 0,
        rps: edge.rps || 0,
      },
    }))

    setNodes(formattedNodes)
    setEdges(formattedEdges)
  }

  const getEdgeColor = (errorRate) => {
    return errorRate > 0.1
      ? '#ff4d4f'
      : errorRate > 0.05
      ? '#faad14'
      : '#52c41a'
  }

  const onNodeDragStop = useCallback(async (event, node) => {
    try {
      await updateNode(node.id, { x: node.position.x, y: node.position.y })
    } catch (error) {
      console.error('Error updating node position:', error)
    }
  }, [])

  const onConnect = useCallback(async (connection) => {
    try {
      const newEdge = {
        source: connection.source,
        target: connection.target,
        traffic: 10,
        protocol: 'HTTP',
        errorRate: Math.random().toFixed(2),
      }

      const createdEdge = await addEdgeAPI(newEdge)

      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            id: createdEdge.id,
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed },
            label: `${createdEdge.traffic}%`,
            style: {
              strokeWidth: 2,
              stroke: getEdgeColor(createdEdge.errorRate),
            },
            data: {
              protocol: createdEdge.protocol,
              errorRate: createdEdge.errorRate,
              rps: createdEdge.rps,
            },
          },
          eds
        )
      )
    } catch (error) {
      console.error('Error adding edge:', error)
    }
  }, [])

  const handleAddNode = useCallback(async () => {
    try {
      const newNode = {
        name: `Service-${Math.floor(Math.random() * 1000)}`,
        type: ['backend', 'frontend', 'database', 'gateway'][
          Math.floor(Math.random() * 4)
        ],
        traffic: Math.floor(Math.random() * 50) + 10,
        errorRate: Math.random().toFixed(2),
        latency: Math.floor(Math.random() * 200) + 50,
        x: Math.random() * 500,
        y: Math.random() * 500,
      }

      const createdNode = await addNodeAPI(newNode)

      // Refresh the entire graph to ensure we get any auto-created connections
      const updatedGraphData = await fetchGraphData()
      updateGraphData(updatedGraphData)
    } catch (error) {
      console.error('Error adding node:', error)
    }
  }, [])

  const handleAddConnection = useCallback(async () => {
    setConnectionMode(true)
  }, [])

  const handleNodeClick = useCallback(
    (event, node) => {
      if (connectionMode) {
        if (!connectionStartNode) {
          setConnectionStartNode(node)
        } else {
          // Create connection between start node and clicked node
          onConnect({
            source: connectionStartNode.id,
            target: node.id,
          })
          setConnectionStartNode(null)
          setConnectionMode(false)
        }
      } else {
        setSelectedElement({ type: 'node', data: node })
      }
    },
    [connectionMode, connectionStartNode, onConnect]
  )

  const handleEdgeClick = useCallback((event, edge) => {
    setSelectedElement({ type: 'edge', data: edge })
  }, [])

  const handleDeleteSelected = useCallback(async () => {
    if (!selectedElement) return

    try {
      if (selectedElement.type === 'node') {
        await deleteNodeAPI(selectedElement.data.id)
        // Refresh graph data after deletion
        const updatedGraphData = await fetchGraphData()
        updateGraphData(updatedGraphData)
      } else if (selectedElement.type === 'edge') {
        await deleteEdgeAPI(
          selectedElement.data.source,
          selectedElement.data.target
        )
        setEdges((eds) =>
          eds.filter((edge) => edge.id !== selectedElement.data.id)
        )
      }
      setSelectedElement(null)
    } catch (error) {
      console.error('Error deleting element:', error)
    }
  }, [selectedElement])

  // Handle mouse enter for nodes and edges
  const handleNodeMouseEnter = useCallback((event, node) => {
    setHoveredElement({ type: 'node', data: node })
    setTooltipPosition({ x: event.clientX, y: event.clientY })
  }, [])

  const handleEdgeMouseEnter = useCallback((event, edge) => {
    setHoveredElement({ type: 'edge', data: edge })
    setTooltipPosition({ x: event.clientX, y: event.clientY })
  }, [])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setHoveredElement(null)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading graph...
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onNodeMouseEnter={handleNodeMouseEnter}
        onEdgeMouseEnter={handleEdgeMouseEnter}
        onNodeMouseLeave={handleMouseLeave}
        onEdgeMouseLeave={handleMouseLeave}
        onPaneClick={() => {
          setConnectionStartNode(null)
          setConnectionMode(false)
          setSelectedElement(null)
        }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={handleAddNode}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Node
        </button>
        <button
          onClick={handleAddConnection}
          className={`px-4 py-2 rounded ${
            connectionMode
              ? 'bg-green-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {connectionMode ? 'Connecting...' : 'Add Connection'}
        </button>
        <button
          onClick={handleDeleteSelected}
          disabled={!selectedElement}
          className={`px-4 py-2 rounded ${
            selectedElement
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Delete Selected
        </button>
        {connectionMode && connectionStartNode && (
          <div className="bg-white p-2 rounded shadow">
            Connecting from: {connectionStartNode.data.label}
          </div>
        )}
      </div>

      {hoveredElement && (
        <Tooltip element={hoveredElement} position={tooltipPosition} />
      )}
    </div>
  )
}

export default Graph
