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
'use client'

import { useEffect, useState, useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Link, Trash2, Loader2 } from 'lucide-react'
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
        border: '3px solid #8B7355',
        borderRadius: '20px',
        padding: '16px 20px',
        backgroundColor: '#F7F5F3',
        color: '#4A453E',
        width: '180px',
        minHeight: '60px',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        fontWeight: '600',
        boxShadow:
          '0 8px 32px rgba(139, 115, 85, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: 'pointer',
      },
    }))

    const formattedEdges = data.edges.map((edge) => ({
      id: edge.id || `e${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: getEdgeColor(edge.errorRate || 0),
      },
      label: `${edge.traffic || 10}%`,
      labelStyle: {
        fill: '#5D5347',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '12px',
        fontWeight: '600',
      },
      labelBgStyle: {
        fill: '#F7F5F3',
        fillOpacity: 0.95,
        rx: 6,
        padding: '6px 10px',
      },
      style: {
        strokeWidth: 3,
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
      ? '#A67C52'
      : errorRate > 0.05
      ? '#B8956A'
      : '#9CAF88'
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
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: getEdgeColor(createdEdge.errorRate),
            },
            label: `${createdEdge.traffic}%`,
            labelStyle: {
              fill: '#5D5347',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: '600',
            },
            labelBgStyle: {
              fill: '#F7F5F3',
              fillOpacity: 0.95,
              rx: 6,
            },
            style: {
              strokeWidth: 3,
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

  const handleNodeMouseEnter = useCallback((event, node) => {
    // Get the ReactFlow container to calculate relative positions
    const reactFlowContainer = event.target.closest('.react-flow')
    if (reactFlowContainer) {
      const containerRect = reactFlowContainer.getBoundingClientRect()
      const nodeRect = event.target.getBoundingClientRect()

      // Calculate position relative to the container
      const nodeX = nodeRect.left - containerRect.left + nodeRect.width
      const nodeY = nodeRect.top - containerRect.top

      setHoveredElement({ type: 'node', data: node })
      setTooltipPosition({
        x: nodeX,
        y: nodeY,
        containerRect: containerRect,
        nodeRect: nodeRect,
      })
    }
  }, [])

  const handleEdgeMouseEnter = useCallback((event, edge) => {
    const reactFlowContainer = event.target.closest('.react-flow')
    if (reactFlowContainer) {
      const containerRect = reactFlowContainer.getBoundingClientRect()

      setHoveredElement({ type: 'edge', data: edge })
      setTooltipPosition({
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top,
        containerRect: containerRect,
      })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredElement(null)
  }, [])

  if (isLoading) {
    return (
      <motion.div
        className="flex justify-center items-center h-full bg-stone-50 p-12 md:p-10 lg:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-6 text-stone-600">
          <Loader2 className="w-12 h-12 animate-spin text-stone-700" />
          <span className="text-2xl font-medium">Loading graph...</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="w-full h-full p-2 md:p-2 lg:p-8 bg-stone-50"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="graph-container w-full h-full relative">
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
          fitViewOptions={{ padding: 0.1, maxZoom: 1.5, minZoom: 0.3 }}
          minZoom={0.3}
          maxZoom={2}
          defaultZoom={0.8}
          className="bg-stone-50 rounded-2xl"
        >
          <Background color="#D6C7B8" gap={24} size={1.5} />
          <Controls
            className="bg-white/90 border-2 border-stone-300 rounded-xl shadow-lg backdrop-blur-sm"
            showZoom={true}
            showFitView={true}
            showInteractive={false}
            position="bottom-right"
          />
        </ReactFlow>

        {/* Tooltip positioned relative to the graph container */}
        <AnimatePresence>
          {hoveredElement && (
            <Tooltip element={hoveredElement} position={tooltipPosition} />
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.button
          onClick={handleAddNode}
          className="bg-stone-700 hover:bg-stone-800 text-white px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-xl font-medium text-sm md:text-base lg:text-lg flex items-center justify-center space-x-2 md:space-x-3 shadow-lg transition-all duration-200 hover:shadow-xl min-w-[120px] md:min-w-[140px] lg:min-w-[160px]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span>Add Node</span>
        </motion.button>

        <motion.button
          onClick={handleAddConnection}
          className={`px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-xl font-medium text-sm md:text-base lg:text-lg flex items-center justify-center space-x-2 md:space-x-3 shadow-lg transition-all duration-200 hover:shadow-xl min-w-[120px] md:min-w-[140px] lg:min-w-[160px] ${
            connectionMode
              ? 'bg-stone-600 hover:bg-stone-700 text-white'
              : 'bg-stone-700 hover:bg-stone-800 text-white hover:scale-105'
          }`}
          whileHover={{ scale: connectionMode ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link className="w-4 h-4 md:w-5 md:h-5" />
          <span>{connectionMode ? 'Connecting...' : 'Add Connection'}</span>
        </motion.button>

        <motion.button
          onClick={handleDeleteSelected}
          disabled={!selectedElement}
          className={`px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-xl font-medium text-sm md:text-base lg:text-lg flex items-center justify-center space-x-2 md:space-x-3 shadow-lg transition-all duration-200 min-w-[120px] md:min-w-[140px] lg:min-w-[160px] ${
            selectedElement
              ? 'bg-stone-800 hover:bg-stone-900 text-white hover:shadow-xl hover:scale-105'
              : 'bg-stone-300 text-stone-500 cursor-not-allowed'
          }`}
          whileHover={{ scale: selectedElement ? 1.05 : 1 }}
          whileTap={{ scale: selectedElement ? 0.95 : 1 }}
        >
          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
          <span>Delete Selected</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {connectionMode && connectionStartNode && (
          <motion.div
            className="absolute top-16 md:top-20 lg:top-24 right-4 md:right-6 lg:right-8 bg-white/95 border border-stone-300 text-stone-700 p-3 md:p-4 lg:p-6 rounded-xl shadow-xl backdrop-blur-sm max-w-xs"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm md:text-base font-medium">
              Connecting from:{' '}
              <span className="text-stone-800 font-semibold">
                {connectionStartNode.data.label}
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Graph
