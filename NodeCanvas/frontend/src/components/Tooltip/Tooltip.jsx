// import React from 'react'

// const Tooltip = ({ element, position }) => {
//   if (!element) return null

//   return (
//     <div
//       className="absolute bg-white p-3 rounded shadow-lg border border-gray-200 z-50 pointer-events-none"
//       style={{
//         left: `${position.x + 15}px`,
//         top: `${position.y + 15}px`,
//       }}
//     >
//       {element.type === 'node' ? (
//         <div>
//           <h3 className="font-bold">{element.data.data.label}</h3>
//           <p>Type: {element.data.data.type}</p>
//           <p>Traffic: {element.data.data.traffic}%</p>
//           <p>Error Rate: {(element.data.data.errorRate * 100).toFixed(2)}%</p>
//           <p>Latency: {element.data.data.latency}ms</p>
//         </div>
//       ) : (
//         <div>
//           <h3 className="font-bold">Connection</h3>
//           <p>Traffic: {element.data.label}</p>
//           <p>Protocol: {element.data.data.protocol}</p>
//           <p>Error Rate: {(element.data.data.errorRate * 100).toFixed(2)}%</p>
//           <p>RPS: {element.data.data.rps}</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Tooltip
'use client'
import { motion } from 'framer-motion'
import { Activity, Zap, AlertTriangle, Clock } from 'lucide-react'

const Tooltip = ({ element, position }) => {
  if (!element || !position.containerRect) return null

  const tooltipWidth = 240
  const tooltipHeight = 200
  const offset = 15

  // Calculate position relative to the graph container
  let left = position.x + offset
  let top = position.y - tooltipHeight / 2

  // Get container dimensions
  const containerWidth = position.containerRect.width
  const containerHeight = position.containerRect.height

  // Adjust horizontal position to stay within container
  if (left + tooltipWidth > containerWidth - 20) {
    left = position.x - tooltipWidth - offset
  }

  // Adjust vertical position to stay within container
  if (top < 20) {
    top = 20
  } else if (top + tooltipHeight > containerHeight - 20) {
    top = containerHeight - tooltipHeight - 20
  }

  // Ensure minimum margins within container
  left = Math.max(10, Math.min(left, containerWidth - tooltipWidth - 10))
  top = Math.max(10, Math.min(top, containerHeight - tooltipHeight - 10))

  return (
    <motion.div
      className="absolute z-[1000] pointer-events-none"
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="bg-white/98 backdrop-blur-md border-2 border-stone-300 rounded-xl p-3 shadow-2xl w-60">
        {element.type === 'node' ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-stone-600 to-stone-700 rounded-lg flex items-center justify-center shadow-lg">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-stone-800 text-sm truncate">
                {element.data.data.label}
              </h3>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between py-1">
                <span className="text-stone-600 text-xs font-semibold">
                  Type
                </span>
                <span className="text-stone-800 text-xs font-bold capitalize bg-stone-100 px-2 py-1 rounded-md">
                  {element.data.data.type}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-stone-600" />
                  <span className="text-stone-600 text-xs font-semibold">
                    Traffic
                  </span>
                </div>
                <span className="text-stone-700 text-xs font-bold bg-green-100 px-2 py-1 rounded-md">
                  {element.data.data.traffic}%
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3 text-stone-600" />
                  <span className="text-stone-600 text-xs font-semibold">
                    Error Rate
                  </span>
                </div>
                <span className="text-stone-700 text-xs font-bold bg-red-100 px-2 py-1 rounded-md">
                  {(element.data.data.errorRate * 100).toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-stone-600" />
                  <span className="text-stone-600 text-xs font-semibold">
                    Latency
                  </span>
                </div>
                <span className="text-stone-700 text-xs font-bold bg-blue-100 px-2 py-1 rounded-md">
                  {element.data.data.latency}ms
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-stone-600 to-stone-700 rounded-lg flex items-center justify-center shadow-lg">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-stone-800 text-sm">Connection</h3>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-stone-600" />
                  <span className="text-stone-600 text-xs font-semibold">
                    Traffic
                  </span>
                </div>
                <span className="text-stone-700 text-xs font-bold bg-green-100 px-2 py-1 rounded-md">
                  {element.data.label}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-stone-600 text-xs font-semibold">
                  Protocol
                </span>
                <span className="text-stone-800 text-xs font-bold bg-stone-100 px-2 py-1 rounded-md">
                  {element.data.data.protocol}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3 text-stone-600" />
                  <span className="text-stone-600 text-xs font-semibold">
                    Error Rate
                  </span>
                </div>
                <span className="text-stone-700 text-xs font-bold bg-red-100 px-2 py-1 rounded-md">
                  {(element.data.data.errorRate * 100).toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-stone-600 text-xs font-semibold">
                  RPS
                </span>
                <span className="text-stone-800 text-xs font-bold bg-blue-100 px-2 py-1 rounded-md">
                  {element.data.data.rps}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Arrow based on position */}
        {left > position.x ? (
          <div className="absolute -right-2 top-4 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-transparent border-l-white/98" />
        ) : (
          <div className="absolute -left-2 top-4 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-transparent border-r-white/98" />
        )}
      </div>
    </motion.div>
  )
}

export default Tooltip
