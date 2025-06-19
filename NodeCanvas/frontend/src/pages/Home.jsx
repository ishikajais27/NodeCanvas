// 'use client'
// import { motion } from 'framer-motion'
// import { ArrowRight, Activity, Zap, Shield, BarChart3 } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

// const Home = () => {
//   const navigate = useNavigate()

//   const stats = [
//     {
//       icon: Activity,
//       label: 'Active Services',
//       value: '24',
//       color: 'from-stone-600 to-stone-700',
//     },
//     {
//       icon: Zap,
//       label: 'Avg Response Time',
//       value: '45ms',
//       color: 'from-stone-500 to-stone-600',
//     },
//     {
//       icon: Shield,
//       label: 'Success Rate',
//       value: '99.9%',
//       color: 'from-stone-700 to-stone-800',
//     },
//     {
//       icon: BarChart3,
//       label: 'Total Requests',
//       value: '1.2M',
//       color: 'from-stone-600 to-stone-700',
//     },
//   ]

//   return (
//     <motion.div
//       className="p-12 md:p-16 lg:p-20 xl:p-24 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 min-h-screen"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Hero Section */}
//       <motion.div
//         className="text-center mb-20 max-w-6xl mx-auto"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.1 }}
//       >
//         <div className="flex justify-center mb-12">
//           <div className="w-32 h-32 bg-gradient-to-br from-stone-600 to-stone-700 rounded-4xl flex items-center justify-center shadow-3xl">
//             <Activity className="w-16 h-16 text-white" />
//           </div>
//         </div>

//         <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-stone-800 mb-8 leading-tight">
//           Welcome to{' '}
//           <span className="bg-gradient-to-r from-stone-700 to-stone-800 bg-clip-text text-transparent">
//             Service Mesh Visualizer
//           </span>
//         </h1>

//         <p className="text-2xl md:text-3xl lg:text-4xl text-stone-600 mb-12 max-w-4xl mx-auto leading-relaxed">
//           Visualize, monitor, and understand your service mesh architecture with
//           real-time insights and interactive network topology.
//         </p>

//         <motion.button
//           onClick={() => navigate('/dashboard')}
//           className="bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-white px-12 py-6 rounded-3xl font-bold text-xl flex items-center space-x-6 mx-auto shadow-3xl transition-all duration-300"
//           whileHover={{ scale: 1.05, y: -2 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <span>Explore Dashboard</span>
//           <ArrowRight className="w-8 h-8" />
//         </motion.button>
//       </motion.div>

//       {/* Stats Grid */}
//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mb-20 max-w-7xl mx-auto"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.3 }}
//       >
//         {stats.map((stat, index) => (
//           <motion.div
//             key={stat.label}
//             className="bg-white/80 backdrop-blur-sm p-10 rounded-4xl border-2 border-stone-300 shadow-2xl hover:shadow-3xl transition-all duration-300"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
//             whileHover={{ scale: 1.02, y: -4 }}
//           >
//             <div className="flex items-center space-x-6">
//               <div
//                 className={`w-18 h-18 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center shadow-xl`}
//               >
//                 <stat.icon className="w-9 h-9 text-white" />
//               </div>
//               <div>
//                 <p className="text-4xl font-bold text-stone-800">
//                   {stat.value}
//                 </p>
//                 <p className="text-stone-600 font-semibold text-lg">
//                   {stat.label}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Getting Started Card */}
//       <motion.div
//         className="bg-white/80 backdrop-blur-sm p-12 md:p-16 lg:p-20 rounded-4xl border-2 border-stone-300 shadow-3xl max-w-7xl mx-auto"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.5 }}
//       >
//         <div className="flex flex-col xl:flex-row items-start space-y-10 xl:space-y-0 xl:space-x-12">
//           <div className="w-24 h-24 bg-gradient-to-br from-stone-600 to-stone-700 rounded-4xl flex items-center justify-center flex-shrink-0 shadow-2xl">
//             <Zap className="w-12 h-12 text-white" />
//           </div>

//           <div className="flex-1">
//             <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-8">
//               Getting Started
//             </h2>
//             <p className="text-stone-600 text-xl md:text-2xl leading-relaxed mb-10">
//               Navigate to the Dashboard to view your service mesh visualization
//               in real-time, or learn more about this tool's capabilities in the
//               About section. Monitor your microservices, track performance
//               metrics, and identify bottlenecks with our intuitive interface.
//             </p>

//             <div className="flex flex-col lg:flex-row gap-8">
//               <motion.button
//                 onClick={() => navigate('/dashboard')}
//                 className="bg-stone-700 hover:bg-stone-800 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-4"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Activity className="w-6 h-6" />
//                 <span>View Dashboard</span>
//               </motion.button>

//               <motion.button
//                 onClick={() => navigate('/about')}
//                 className="bg-stone-300 hover:bg-stone-400 text-stone-800 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-200"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Learn More
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }

// export default Home
'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Activity, Zap, Shield, BarChart3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const stats = [
    {
      icon: Activity,
      label: 'Active Services',
      value: '24',
      color: 'from-stone-600 to-stone-700',
    },
    {
      icon: Zap,
      label: 'Avg Response Time',
      value: '45ms',
      color: 'from-stone-500 to-stone-600',
    },
    {
      icon: Shield,
      label: 'Success Rate',
      value: '99.9%',
      color: 'from-stone-700 to-stone-800',
    },
    {
      icon: BarChart3,
      label: 'Total Requests',
      value: '1.2M',
      color: 'from-stone-600 to-stone-700',
    },
  ]

  return (
    <motion.div
      className="p-6 md:p-8 lg:p-12 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-stone-600 to-stone-700 rounded-3xl flex items-center justify-center shadow-2xl">
            <Activity className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-6 leading-tight">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-stone-700 to-stone-800 bg-clip-text text-transparent">
            Service Mesh Visualizer
          </span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Visualize, monitor, and understand your service mesh architecture with
          real-time insights and interactive network topology.
        </p>

        <motion.button
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-4 mx-auto shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Explore Dashboard</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-stone-300 shadow-xl hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-800">
                  {stat.value}
                </p>
                <p className="text-stone-600 font-medium text-sm">
                  {stat.label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Getting Started Card */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-stone-300 shadow-2xl max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex flex-col xl:flex-row items-start space-y-6 xl:space-y-0 xl:space-x-8">
          <div className="w-16 h-16 bg-gradient-to-br from-stone-600 to-stone-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
            <Zap className="w-8 h-8 text-white" />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4">
              Getting Started
            </h2>
            <p className="text-stone-600 text-base md:text-lg leading-relaxed mb-6">
              Navigate to the Dashboard to view your service mesh visualization
              in real-time, or learn more about this tool's capabilities in the
              About section. Monitor your microservices, track performance
              metrics, and identify bottlenecks with our intuitive interface.
            </p>

            <div className="flex flex-col lg:flex-row gap-4">
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="bg-stone-700 hover:bg-stone-800 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Activity className="w-5 h-5" />
                <span>View Dashboard</span>
              </motion.button>

              <motion.button
                onClick={() => navigate('/about')}
                className="bg-stone-300 hover:bg-stone-400 text-stone-800 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Home
