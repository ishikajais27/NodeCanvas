// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
//   const controller = new AbortController()
//   const timeoutId = setTimeout(() => controller.abort(), timeout)

//   try {
//     const response = await fetch(url, {
//       ...options,
//       signal: controller.signal,
//       credentials: 'include',
//     })
//     clearTimeout(timeoutId)
//     return response
//   } catch (error) {
//     clearTimeout(timeoutId)
//     throw error
//   }
// }

// const handleResponse = async (response) => {
//   if (!response.ok) {
//     const error = await response.json().catch(() => ({}))
//     throw new Error(error.error || error.message || 'Request failed')
//   }
//   return response.json()
// }

// // Services API
// export const fetchServices = async (filters = {}) => {
//   const query = new URLSearchParams(filters).toString()
//   const response = await fetchWithTimeout(`${API_BASE_URL}/services?${query}`)
//   return handleResponse(response)
// }

// export const createService = async (service) => {
//   const response = await fetchWithTimeout(`${API_BASE_URL}/services`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(service),
//   })
//   return handleResponse(response)
// }

// export const updateService = async (id, updates) => {
//   const response = await fetchWithTimeout(`${API_BASE_URL}/services/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(updates),
//   })
//   return handleResponse(response)
// }

// export const deleteService = async (id) => {
//   const response = await fetchWithTimeout(`${API_BASE_URL}/services/${id}`, {
//     method: 'DELETE',
//   })
//   return handleResponse(response)
// }

// // Connections API
// export const fetchConnections = async (filters = {}) => {
//   const query = new URLSearchParams(filters).toString()
//   const response = await fetchWithTimeout(
//     `${API_BASE_URL}/connections?${query}`
//   )
//   return handleResponse(response)
// }

// export const createConnection = async (connection) => {
//   const response = await fetchWithTimeout(`${API_BASE_URL}/connections`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(connection),
//   })
//   return handleResponse(response)
// }

// export const deleteConnection = async (id) => {
//   const response = await fetchWithTimeout(`${API_BASE_URL}/connections/${id}`, {
//     method: 'DELETE',
//   })
//   return handleResponse(response)
// }

// // Real-time updates
// export const subscribeToUpdates = (callback) => {
//   const eventSource = new EventSource(`${API_BASE_URL}/stream`)

//   eventSource.onmessage = (event) => {
//     try {
//       const data = JSON.parse(event.data)
//       callback(data)
//     } catch (error) {
//       console.error('Error parsing update:', error)
//     }
//   }

//   eventSource.onerror = () => {
//     eventSource.close()
//     setTimeout(() => subscribeToUpdates(callback), 5000)
//   }

//   return () => eventSource.close()
// }

// // Health check
// export const checkHealth = async () => {
//   const response = await fetchWithTimeout(`${API_BASE_URL}/health`)
//   return handleResponse(response)
// }
// const API_BASE_URL = 'http://localhost:5000/api'

// export const fetchGraphData = async () => {
//   const response = await fetch(`${API_BASE_URL}/graph`)
//   return await response.json()
// }

// export const addNode = async (node) => {
//   const response = await fetch(`${API_BASE_URL}/nodes`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(node),
//   })
//   return await response.json()
// }

// export const updateNode = async (id, updates) => {
//   const response = await fetch(`${API_BASE_URL}/nodes/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(updates),
//   })
//   return await response.json()
// }

// export const deleteNode = async (id) => {
//   await fetch(`${API_BASE_URL}/nodes/${id}`, {
//     method: 'DELETE',
//   })
// }

// export const addEdge = async (edge) => {
//   const response = await fetch(`${API_BASE_URL}/edges`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(edge),
//   })
//   return await response.json()
// }

// export const deleteEdge = async (source, target) => {
//   await fetch(`${API_BASE_URL}/edges`, {
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ source, target }),
//   })
// }
const API_BASE_URL = 'http://localhost:5000/api'

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
