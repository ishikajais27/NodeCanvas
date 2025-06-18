// import React from 'react'

// const Tooltip = ({ element }) => {
//   if (!element) return null

//   const getTooltipContent = () => {
//     if (element.type === 'node') {
//       return (
//         <div>
//           <h3 className="font-bold text-lg">{element.data.data.label}</h3>
//           <div className="mt-2 space-y-1">
//             <p>
//               <span className="font-semibold">ID:</span> {element.data.id}
//             </p>
//             <p>
//               <span className="font-semibold">Position:</span> X:{' '}
//               {Math.round(element.data.position.x)}, Y:{' '}
//               {Math.round(element.data.position.y)}
//             </p>
//           </div>
//         </div>
//       )
//     } else if (element.type === 'edge') {
//       return (
//         <div>
//           <h3 className="font-bold text-lg">Connection</h3>
//           <div className="mt-2 space-y-1">
//             <p>
//               <span className="font-semibold">From:</span> {element.data.source}
//             </p>
//             <p>
//               <span className="font-semibold">To:</span> {element.data.target}
//             </p>
//             <p>
//               <span className="font-semibold">Traffic:</span>{' '}
//               {element.data.label}
//             </p>
//           </div>
//         </div>
//       )
//     }
//     return null
//   }

//   return (
//     <div className="absolute right-4 top-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-10 max-w-xs">
//       {getTooltipContent()}
//     </div>
//   )
// }

// export default Tooltip
import React from 'react'

const Tooltip = ({ element, position }) => {
  if (!element) return null

  return (
    <div
      className="absolute bg-white p-3 rounded shadow-lg border border-gray-200 z-50 pointer-events-none"
      style={{
        left: `${position.x + 15}px`,
        top: `${position.y + 15}px`,
      }}
    >
      {element.type === 'node' ? (
        <div>
          <h3 className="font-bold">{element.data.data.label}</h3>
          <p>Type: {element.data.data.type}</p>
          <p>Traffic: {element.data.data.traffic}%</p>
          <p>Error Rate: {(element.data.data.errorRate * 100).toFixed(2)}%</p>
          <p>Latency: {element.data.data.latency}ms</p>
        </div>
      ) : (
        <div>
          <h3 className="font-bold">Connection</h3>
          <p>Traffic: {element.data.label}</p>
          <p>Protocol: {element.data.data.protocol}</p>
          <p>Error Rate: {(element.data.data.errorRate * 100).toFixed(2)}%</p>
          <p>RPS: {element.data.data.rps}</p>
        </div>
      )}
    </div>
  )
}

export default Tooltip
