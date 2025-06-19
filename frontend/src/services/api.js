const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchGraphData = async () => {
  const response = await fetch(`${API_BASE_URL}/graph`)
  if (!response.ok) {
    throw new Error(`Failed to fetch graph data: ${response.status}`)
  }
  return await response.json()
}

export const addNode = async (node) => {
  const response = await fetch(`${API_BASE_URL}/nodes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(node),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to add node')
  }
  return await response.json()
}

export const updateNode = async (id, updates) => {
  const response = await fetch(`${API_BASE_URL}/nodes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to update node')
  }
  return await response.json()
}

export const deleteNode = async (id) => {
  const response = await fetch(`${API_BASE_URL}/nodes/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to delete node')
  }
}

export const addEdge = async (edge) => {
  const response = await fetch(`${API_BASE_URL}/edges`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(edge),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to add edge')
  }
  return await response.json()
}

export const deleteEdge = async (source, target) => {
  const response = await fetch(`${API_BASE_URL}/edges`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source, target }),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to delete edge')
  }
}

// Add these functions to api.js

export const searchNodes = async (query) => {
  const response = await fetch(
    `${API_BASE_URL}/nodes/search?q=${encodeURIComponent(query)}`
  )
  if (!response.ok) {
    throw new Error(`Failed to search nodes: ${response.status}`)
  }
  return await response.json()
}

export const filterNodesByType = async (type) => {
  const response = await fetch(
    `${API_BASE_URL}/nodes/filter?type=${encodeURIComponent(type)}`
  )
  if (!response.ok) {
    throw new Error(`Failed to filter nodes: ${response.status}`)
  }
  return await response.json()
}
