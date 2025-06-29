'use client'
import { motion } from 'framer-motion'
import { Activity, Zap, AlertTriangle, Clock } from 'lucide-react'

const Tooltip = ({ element, position }) => {
  if (!element || !position.containerRect) return null

  const isMobile = window.innerWidth < 640
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024

  const tooltipWidth = isMobile ? 200 : isTablet ? 220 : 240
  const tooltipHeight = isMobile ? 160 : isTablet ? 180 : 200
  const offset = isMobile ? 10 : 15

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
      <div
        className="bg-white/98 backdrop-blur-md border-2 border-stone-300 rounded-xl p-2 sm:p-3 shadow-2xl"
        style={{ width: `${tooltipWidth}px` }}
      >
        {element.type === 'node' ? (
          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <div
                className={`${
                  isMobile ? 'w-6 h-6' : 'w-8 h-8'
                } bg-gradient-to-br from-stone-600 to-stone-700 rounded-lg flex items-center justify-center shadow-lg`}
              >
                <Activity
                  className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-white`}
                />
              </div>
              <h3
                className={`font-bold text-stone-800 ${
                  isMobile ? 'text-xs' : 'text-sm'
                } truncate`}
              >
                {element.data.data.label}
              </h3>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between py-1">
                <span
                  className={`text-stone-600 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  } font-semibold`}
                >
                  Type
                </span>
                <span
                  className={`text-stone-800 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  } font-bold capitalize bg-stone-100 px-2 py-1 rounded-md`}
                >
                  {element.data.data.type}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-1">
                  <Zap
                    className={`${
                      isMobile ? 'w-2 h-2' : 'w-3 h-3'
                    } text-stone-600`}
                  />
                  <span
                    className={`text-stone-600 ${
                      isMobile ? 'text-xs' : 'text-xs'
                    } font-semibold`}
                  >
                    Traffic
                  </span>
                </div>
                <span
                  className={`text-stone-700 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  } font-bold bg-green-100 px-2 py-1 rounded-md`}
                >
                  {element.data.data.traffic}%
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-1">
                  <AlertTriangle
                    className={`${
                      isMobile ? 'w-2 h-2' : 'w-3 h-3'
                    } text-stone-600`}
                  />
                  <span
                    className={`text-stone-600 ${
                      isMobile ? 'text-xs' : 'text-xs'
                    } font-semibold`}
                  >
                    Error Rate
                  </span>
                </div>
                <span
                  className={`text-stone-700 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  } font-bold bg-red-100 px-2 py-1 rounded-md`}
                >
                  {(element.data.data.errorRate * 100).toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-1">
                  <Clock
                    className={`${
                      isMobile ? 'w-2 h-2' : 'w-3 h-3'
                    } text-stone-600`}
                  />
                  <span
                    className={`text-stone-600 ${
                      isMobile ? 'text-xs' : 'text-xs'
                    } font-semibold`}
                  >
                    Latency
                  </span>
                </div>
                <span
                  className={`text-stone-700 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  } font-bold bg-blue-100 px-2 py-1 rounded-md`}
                >
                  {element.data.data.latency}ms
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <div
                className={`${
                  isMobile ? 'w-6 h-6' : 'w-8 h-8'
                } bg-gradient-to-br from-stone-600 to-stone-700 rounded-lg flex items-center justify-center shadow-lg`}
              >
                <Activity
                  className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-white`}
                />
              </div>
              <h3
                className={`font-bold text-stone-800 ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}
              >
                Connection
              </h3>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-1">
                  <Zap
                    className={`${
                      isMobile ? 'w-2 h-2' : 'w-3 h-3'
                    } text-stone-600`}
                  />
                  <span
                    className={`text-stone-600 ${
                      isMobile ? 'text-xs' : 'text-xs'
                    } font-semibold`}
                  >
                    Traffic
                  </span>
                </div>
                <span
                  className={`text-stone-700 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  } font-bold bg-green-100 px-2 py-1 rounded-md`}
                >
                  {element.data.label}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span
                  className={`text-stone-600 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  } font-semibold`}
                >
                  Protocol
                </span>
                <span
                  className={`text-stone-800 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  } font-bold bg-stone-100 px-2 py-1 rounded-md`}
                >
                  {element.data.data.protocol}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-1">
                  <AlertTriangle
                    className={`${
                      isMobile ? 'w-2 h-2' : 'w-3 h-3'
                    } text-stone-600`}
                  />
                  <span
                    className={`text-stone-600 ${
                      isMobile ? 'text-xs' : 'text-xs'
                    } font-semibold`}
                  >
                    Error Rate
                  </span>
                </div>
                <span
                  className={`text-stone-700 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  } font-bold bg-red-100 px-2 py-1 rounded-md`}
                >
                  {(element.data.data.errorRate * 100).toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span
                  className={`text-stone-600 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  } font-semibold`}
                >
                  RPS
                </span>
                <span
                  className={`text-stone-800 ${
                    isMobile ? 'text-xs' : 'text-xs'
                  } font-bold bg-blue-100 px-2 py-1 rounded-md`}
                >
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
