// frontend/src/contexts/GraphContext.jsx
import { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api'

const GraphContext = createContext()

export function GraphProvider({ children }) {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Initial data load
    api.get('/graph').then(({ data }) => {
      setNodes(data.nodes)
      setEdges(data.edges)
    })

    // WebSocket connection
    const ws = new WebSocket('ws://localhost:5000')

    ws.onopen = () => setIsConnected(true)
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.type === 'GRAPH_UPDATED') {
        setNodes(message.payload.nodes)
        setEdges(message.payload.edges)
      }
    }
    ws.onclose = () => setIsConnected(false)

    return () => ws.close()
  }, [])

  const addNode = async (nodeData) => {
    const { data } = await api.post('/nodes', nodeData)
    return data
  }

  const deleteNode = async (id) => {
    await api.delete(`/nodes/${id}`)
  }

  // Other CRUD operations...

  return (
    <GraphContext.Provider
      value={{
        nodes,
        edges,
        selectedElement,
        isConnected,
        setSelectedElement,
        addNode,
        deleteNode,
        // Other operations...
      }}
    >
      {children}
    </GraphContext.Provider>
  )
}

export const useGraph = () => useContext(GraphContext)
