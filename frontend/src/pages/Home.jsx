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
      className="p-3 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 min-h-screen overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <motion.div
        className="text-center mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-stone-600 to-stone-700 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl">
            <Activity className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-4 sm:mb-6 leading-tight px-4">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-stone-700 to-stone-800 bg-clip-text text-transparent">
            Service Mesh Visualizer
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-stone-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          Visualize, monitor, and understand your service mesh architecture with
          real-time insights and interactive network topology.
        </p>

        <motion.button
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg flex items-center space-x-3 sm:space-x-4 mx-auto shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Explore Dashboard</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-stone-300 shadow-xl hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xl sm:text-2xl font-bold text-stone-800">
                  {stat.value}
                </p>
                <p className="text-stone-600 font-medium text-xs sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Getting Started Card */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl border border-stone-300 shadow-2xl max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex flex-col xl:flex-row items-start space-y-4 sm:space-y-6 xl:space-y-0 xl:space-x-6 md:xl:space-x-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-stone-600 to-stone-700 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-800 mb-3 sm:mb-4">
              Getting Started
            </h2>
            <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              Navigate to the Dashboard to view your service mesh visualization
              in real-time, or learn more about this tool's capabilities in the
              About section. Monitor your microservices, track performance
              metrics, and identify bottlenecks with our intuitive interface.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="bg-stone-700 hover:bg-stone-800 text-white px-5 py-3 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>View Dashboard</span>
              </motion.button>

              <motion.button
                onClick={() => navigate('/about')}
                className="bg-stone-300 hover:bg-stone-400 text-stone-800 px-5 py-3 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200"
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
