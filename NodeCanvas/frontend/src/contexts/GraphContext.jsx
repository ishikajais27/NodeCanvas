// import React, { createContext, useContext, useState, useEffect } from 'react'
// import {
//   fetchGraphData,
//   addNode,
//   updateNode,
//   deleteNode,
//   addEdge,
//   deleteEdge,
// } from '../services/api'

// const GraphContext = createContext()

// export const GraphProvider = ({ children }) => {
//   const [nodes, setNodes] = useState([])
//   const [edges, setEdges] = useState([])
//   const [selectedElement, setSelectedElement] = useState(null)
//   const [hoveredElement, setHoveredElement] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [filters, setFilters] = useState({
//     namespace: '',
//     type: '',
//     healthStatus: '',
//   })

//   // Metrics utilities
//   const nodeMetrics = {
//     getHealthStatus: (node) => node?.healthStatus || 'unknown',
//     getLatencyMetrics: (node) => ({
//       p50: node?.latency?.p50 || 0,
//       p90: node?.latency?.p90 || 0,
//       p99: node?.latency?.p99 || 0,
//     }),
//     getResourceUsage: (node) => ({
//       cpu: node?.cpuUsage || 0,
//       memory: node?.memoryUsage || 0,
//     }),
//     getTags: (node) => node?.tags || [],
//   }

//   const edgeMetrics = {
//     getRPS: (edge) => edge?.rps || 0,
//     getErrorRate: (edge) => edge?.errorRate || 0,
//     getCircuitBreakerStatus: (edge) =>
//       edge?.circuitBreaker?.enabled ? 'enabled' : 'disabled',
//     getTimeout: (edge) => edge?.timeout || 0,
//   }

//   const loadData = async () => {
//     try {
//       setLoading(true)
//       setError(null)

//       const graphData = await fetchGraphData()
//       setNodes(graphData.nodes || [])
//       setEdges(graphData.edges || [])
//     } catch (err) {
//       setError(err.message)
//       console.error('Failed to load graph data:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleNodeDrag = (id, x, y) => {
//     setNodes((prev) =>
//       prev.map((node) => (node.id === id ? { ...node, x, y } : node))
//     )
//   }

//   const handleNodeDrop = async (id, x, y) => {
//     try {
//       await updateNode(id, { x, y })
//     } catch (err) {
//       setError(err.message)
//       // Revert position if update fails
//       loadData()
//     }
//   }

//   const handleAddNode = async (nodeData) => {
//     try {
//       const newNode = await addNode(nodeData)
//       setNodes((prev) => [...prev, newNode])
//       return newNode
//     } catch (err) {
//       setError(err.message)
//       throw err
//     }
//   }

//   const handleRemoveNode = async (id) => {
//     try {
//       await deleteNode(id)
//       setNodes((prev) => prev.filter((node) => node.id !== id))
//       setEdges((prev) =>
//         prev.filter((edge) => edge.source !== id && edge.target !== id)
//       )
//       if (selectedElement?.id === id) {
//         setSelectedElement(null)
//       }
//     } catch (err) {
//       setError(err.message)
//       throw err
//     }
//   }

//   const addEdge = async (source, target) => {
//     try {
//       const newEdge = await addEdge({ source, target })
//       setEdges((prev) => [...prev, newEdge])
//       return newEdge
//     } catch (err) {
//       setError(err.message)
//       throw err
//     }
//   }

//   const removeEdge = async (source, target) => {
//     try {
//       await deleteEdge(source, target)
//       setEdges((prev) =>
//         prev.filter(
//           (edge) => !(edge.source === source && edge.target === target)
//         )
//       )
//       if (
//         selectedElement?.source === source &&
//         selectedElement?.target === target
//       ) {
//         setSelectedElement(null)
//       }
//     } catch (err) {
//       setError(err.message)
//       throw err
//     }
//   }

//   const updateNodeData = async (id, data) => {
//     try {
//       const updatedNode = await updateNode(id, data)
//       setNodes((prev) =>
//         prev.map((node) =>
//           node.id === id ? { ...node, ...updatedNode } : node
//         )
//       )
//       if (selectedElement?.id === id) {
//         setSelectedElement((prev) => ({ ...prev, ...updatedNode }))
//       }
//     } catch (err) {
//       setError(err.message)
//       throw err
//     }
//   }

//   const applyFilters = (newFilters) => {
//     setFilters(newFilters)
//   }

//   useEffect(() => {
//     loadData()
//   }, [filters])

//   const contextValue = {
//     nodes,
//     edges,
//     selectedElement,
//     hoveredElement,
//     filters,
//     loading,
//     error,
//     nodeMetrics,
//     edgeMetrics,
//     setSelectedElement,
//     setHoveredElement,
//     handleNodeDrag,
//     handleNodeDrop,
//     addNode: handleAddNode,
//     removeNode: handleRemoveNode,
//     addEdge,
//     removeEdge,
//     updateNodeData,
//     applyFilters,
//     loadData,
//   }

//   return (
//     <GraphContext.Provider value={contextValue}>
//       {children}
//     </GraphContext.Provider>
//   )
// }

// export const useGraphContext = () => {
//   const context = useContext(GraphContext)
//   if (!context) {
//     throw new Error('useGraphContext must be used within a GraphProvider')
//   }
//   return context
// }
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import {
  fetchGraphData,
  addNode,
  updateNode,
  deleteNode,
  addEdge as addEdgeAPI,
  deleteEdge as deleteEdgeAPI,
} from '../services/api'

const GraphContext = createContext()

export const GraphProvider = ({ children }) => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [hoveredElement, setHoveredElement] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [connectionMode, setConnectionMode] = useState(false)
  const [connectionStartNode, setConnectionStartNode] = useState(null)

  // Metrics utilities
  const nodeMetrics = {
    getHealthStatus: (node) => node?.healthStatus || 'unknown',
    getLatencyMetrics: (node) => ({
      p50: node?.latency?.p50 || 0,
      p90: node?.latency?.p90 || 0,
      p99: node?.latency?.p99 || 0,
    }),
    getResourceUsage: (node) => ({
      cpu: node?.cpuUsage || 0,
      memory: node?.memoryUsage || 0,
    }),
    getTags: (node) => node?.tags || [],
  }

  const edgeMetrics = {
    getRPS: (edge) => edge?.rps || 0,
    getErrorRate: (edge) => edge?.errorRate || 0,
    getCircuitBreakerStatus: (edge) =>
      edge?.circuitBreaker?.enabled ? 'enabled' : 'disabled',
    getTimeout: (edge) => edge?.timeout || 0,
  }

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchGraphData()
      setNodes(data.nodes || [])
      setEdges(data.edges || [])
    } catch (err) {
      setError(err.message)
      console.error('Failed to load graph data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleNodeDragStop = useCallback(
    async (nodeId, position) => {
      try {
        await updateNode(nodeId, { x: position.x, y: position.y })
      } catch (err) {
        setError(err.message)
        // Revert to original data if update fails
        loadData()
      }
    },
    [loadData]
  )

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

      const createdNode = await addNode(newNode)
      setNodes((prev) => [...prev, createdNode])
      return createdNode
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const handleRemoveNode = useCallback(
    async (nodeId) => {
      try {
        await deleteNode(nodeId)
        setNodes((prev) => prev.filter((node) => node.id !== nodeId))
        setEdges((prev) =>
          prev.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId
          )
        )
        if (selectedElement?.id === nodeId) {
          setSelectedElement(null)
        }
      } catch (err) {
        setError(err.message)
        throw err
      }
    },
    [selectedElement]
  )

  const handleConnect = useCallback(async (connection) => {
    try {
      const newEdge = {
        source: connection.source,
        target: connection.target,
        traffic: 10,
        protocol: 'HTTP',
        errorRate: Math.random().toFixed(2),
      }

      const createdEdge = await addEdgeAPI(newEdge)
      setEdges((prev) => [...prev, createdEdge])
      return createdEdge
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const handleRemoveEdge = useCallback(
    async (edgeId) => {
      try {
        await deleteEdgeAPI(edgeId)
        setEdges((prev) => prev.filter((edge) => edge.id !== edgeId))
        if (selectedElement?.id === edgeId) {
          setSelectedElement(null)
        }
      } catch (err) {
        setError(err.message)
        throw err
      }
    },
    [selectedElement]
  )

  const handleNodeClick = useCallback(
    (node) => {
      if (connectionMode) {
        if (!connectionStartNode) {
          setConnectionStartNode(node)
        } else {
          handleConnect({
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
    [connectionMode, connectionStartNode, handleConnect]
  )

  const handleEdgeClick = useCallback((edge) => {
    setSelectedElement({ type: 'edge', data: edge })
  }, [])

  const handlePaneClick = useCallback(() => {
    setConnectionStartNode(null)
    setConnectionMode(false)
    setSelectedElement(null)
  }, [])

  const handleAddConnection = useCallback(() => {
    setConnectionMode(true)
  }, [])

  const handleDeleteSelected = useCallback(async () => {
    if (!selectedElement) return

    try {
      if (selectedElement.type === 'node') {
        await handleRemoveNode(selectedElement.data.id)
      } else if (selectedElement.type === 'edge') {
        await handleRemoveEdge(selectedElement.data.id)
      }
      setSelectedElement(null)
    } catch (err) {
      console.error('Error deleting element:', err)
    }
  }, [selectedElement, handleRemoveNode, handleRemoveEdge])

  useEffect(() => {
    loadData()
  }, [loadData])

  const contextValue = {
    nodes,
    edges,
    selectedElement,
    hoveredElement,
    connectionMode,
    connectionStartNode,
    loading,
    error,
    nodeMetrics,
    edgeMetrics,
    setSelectedElement,
    setHoveredElement,
    onNodeDragStop: handleNodeDragStop,
    onConnect: handleConnect,
    onNodeClick: handleNodeClick,
    onEdgeClick: handleEdgeClick,
    onPaneClick: handlePaneClick,
    addNode: handleAddNode,
    addConnection: handleAddConnection,
    deleteSelected: handleDeleteSelected,
    loadData,
  }

  return (
    <GraphContext.Provider value={contextValue}>
      {children}
    </GraphContext.Provider>
  )
}

export const useGraphContext = () => {
  const context = useContext(GraphContext)
  if (!context) {
    throw new Error('useGraphContext must be used within a GraphProvider')
  }
  return context
}
