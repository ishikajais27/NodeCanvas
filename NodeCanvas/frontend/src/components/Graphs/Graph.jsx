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
} from '../../services/api'
import Tooltip from '../Tooltip/Tooltip'

const Graph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [hoveredElement, setHoveredElement] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphData()

        const formattedNodes = data.nodes.map((node) => ({
          id: node.id,
          data: { label: node.name },
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
          id: `e${edge.source}-${edge.target}`,
          source: edge.source,
          target: edge.target,
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed },
          label: `${edge.traffic}%`,
          style: { strokeWidth: 2 },
        }))

        setNodes(formattedNodes)
        setEdges(formattedEdges)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading graph data:', error)
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const onNodeDragStop = useCallback(async (event, node) => {
    try {
      await updateNode(node.id, { x: node.position.x, y: node.position.y })
    } catch (error) {
      console.error('Error updating node position:', error)
    }
  }, [])

  const onConnect = useCallback(async (params) => {
    try {
      await addEdgeAPI({
        source: params.source,
        target: params.target,
        traffic: 10, // Default traffic value
        protocol: 'HTTP',
      })

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            id: `e${params.source}-${params.target}`,
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed },
            label: '10%',
            style: { strokeWidth: 2 },
          },
          eds
        )
      )
    } catch (error) {
      console.error('Error adding edge:', error)
    }
  }, [])

  const onEdgeDelete = useCallback(async (edgesToRemove) => {
    try {
      for (const edge of edgesToRemove) {
        await deleteEdgeAPI(edge.source, edge.target)
      }
    } catch (error) {
      console.error('Error deleting edge:', error)
    }
  }, [])

  const onNodeMouseEnter = useCallback((event, node) => {
    setHoveredElement({ type: 'node', data: node })
  }, [])

  const onNodeMouseLeave = useCallback(() => {
    setHoveredElement(null)
  }, [])

  const onEdgeMouseEnter = useCallback((event, edge) => {
    setHoveredElement({ type: 'edge', data: edge })
  }, [])

  const onEdgeMouseLeave = useCallback(() => {
    setHoveredElement(null)
  }, [])

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        Loading graph...
      </div>
    )

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onEdgesDelete={onEdgeDelete}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseLeave={onEdgeMouseLeave}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      {hoveredElement && <Tooltip element={hoveredElement} />}
    </div>
  )
}

export default Graph
// import React, { useState, useEffect, useCallback } from 'react'
// import ReactFlow, {
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Background,
//   Controls,
// } from 'reactflow'
// import 'reactflow/dist/style.css'
// import { fetchGraphData, addNode, deleteNode } from '../../services/api'

// const Graph = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([])
//   const [edges, setEdges, onEdgesChange] = useEdgesState([])
//   const [loading, setLoading] = useState(true)

//   // Load initial data
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const data = await fetchGraphData()
//         setNodes(
//           data.nodes.map((node) => ({
//             id: node.id,
//             data: { label: node.name },
//             position: { x: node.x, y: node.y },
//           }))
//         )
//         setEdges(
//           data.edges.map((edge) => ({
//             id: `e${edge.source}-${edge.target}`,
//             source: edge.source,
//             target: edge.target,
//             label: `${edge.traffic}%`,
//           }))
//         )
//       } catch (error) {
//         console.error('Error loading data:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     loadData()
//   }, [])

//   // Handle adding a node
//   const handleAddNode = useCallback(async () => {
//     try {
//       const newNode = await addNode({
//         x: Math.random() * 500,
//         y: Math.random() * 500,
//       })

//       setNodes((nds) =>
//         nds.concat({
//           id: newNode.id,
//           data: { label: newNode.name },
//           position: { x: newNode.x, y: newNode.y },
//         })
//       )
//     } catch (error) {
//       console.error('Error adding node:', error)
//     }
//   }, [])

//   // Handle deleting a node
//   const handleDeleteNode = useCallback(async (nodeId) => {
//     try {
//       await deleteNode(nodeId)
//       setNodes((nds) => nds.filter((n) => n.id !== nodeId))
//       setEdges((eds) =>
//         eds.filter((e) => e.source !== nodeId && e.target !== nodeId)
//       )
//     } catch (error) {
//       console.error('Error deleting node:', error)
//     }
//   }, [])

//   if (loading) return <div>Loading graph...</div>

//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onNodeClick={(event, node) => {
//           if (event.detail === 2) {
//             // Double click to delete
//             handleDeleteNode(node.id)
//           }
//         }}
//         fitView
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>

//       <button
//         onClick={handleAddNode}
//         style={{
//           position: 'absolute',
//           top: 10,
//           left: 10,
//           zIndex: 100,
//           padding: '8px 16px',
//           background: '#6366f1',
//           color: 'white',
//           border: 'none',
//           borderRadius: 4,
//           cursor: 'pointer',
//         }}
//       >
//         Add Node
//       </button>
//     </div>
//   )
// }

// export default Graph
