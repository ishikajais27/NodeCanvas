import React from 'react'

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Service Mesh Visualizer
      </h1>
      <p className="mb-4">
        This tool helps you visualize and understand your service mesh
        architecture.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <p>
          Navigate to the Dashboard to view your service mesh visualization or
          learn more about this tool in the About section.
        </p>
      </div>
    </div>
  )
}

export default Home
