import React from 'react'

const About = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">About Service Mesh Visualizer</h1>
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Interactive visualization of service mesh architecture</li>
            <li>Graph and list view modes</li>
            <li>Detailed service metrics</li>
            <li>Responsive design</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Technology Stack</h2>
          <p>Built with React, React Flow, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}

export default About
