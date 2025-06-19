// 'use client'
// import { motion } from 'framer-motion'
// import Graph from '../components/Graphs/Graph'

// const Dashboard = () => {
//   return (
//     <motion.div
//       className="h-full bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="h-full p-4 md:p-6 lg:p-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="mb-4 md:mb-6"
//         >
//           <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-800 mb-2">
//             Service Mesh Dashboard
//           </h1>
//           <p className="text-stone-600 text-sm md:text-base lg:text-lg">
//             Monitor and visualize your service mesh architecture
//           </p>
//         </motion.div>

//         <motion.div
//           className="h-[calc(100vh-140px)] md:h-[calc(100vh-160px)] lg:h-[calc(100vh-180px)] bg-white/50 backdrop-blur-sm rounded-2xl border border-stone-300 shadow-xl overflow-hidden"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <Graph />
//         </motion.div>
//       </div>
//     </motion.div>
//   )
// }

// export default Dashboard
'use client'
import { motion } from 'framer-motion'
import Graph from '../components/Graphs/Graph'

const Dashboard = () => {
  return (
    <motion.div
      className="h-full bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="h-full p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 md:mb-6"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-800 mb-2">
            Service Mesh Dashboard
          </h1>
          <p className="text-stone-600 text-sm md:text-base lg:text-lg">
            Monitor and visualize your service mesh architecture
          </p>
        </motion.div>

        <motion.div
          className="h-[calc(100vh-140px)] md:h-[calc(100vh-160px)] lg:h-[calc(100vh-180px)] bg-white/50 backdrop-blur-sm rounded-2xl border border-stone-300 shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Graph />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Dashboard
