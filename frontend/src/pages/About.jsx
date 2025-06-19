'use client'
import { motion } from 'framer-motion'
import { Activity, Zap, Eye, Smartphone, Code, Layers } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Activity,
      title: 'Interactive Visualization',
      description:
        'Real-time interactive visualization of service mesh architecture with smooth animations',
    },
    {
      icon: Eye,
      title: 'Multiple View Modes',
      description:
        'Switch between graph and list view modes for different perspectives',
    },
    {
      icon: Zap,
      title: 'Detailed Metrics',
      description:
        'Comprehensive service metrics including traffic, latency, and error rates',
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description:
        'Fully responsive design that works seamlessly across all devices',
    },
  ]

  const technologies = [
    {
      name: 'React',
      description: 'Modern UI library for building interactive interfaces',
    },
    {
      name: 'React Flow',
      description: 'Powerful library for building node-based editors',
    },
    {
      name: 'D3.js',
      description: 'Data-driven documents for complex visualizations',
    },
    {
      name: 'Framer Motion',
      description: 'Production-ready motion library for React',
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development',
    },
  ]

  return (
    <motion.div
      className="p-3 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 min-h-screen overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 mb-6 sm:mb-8 md:mb-10">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-stone-600 to-stone-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
            <Activity className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 leading-tight">
            About Service Mesh Visualizer
          </h1>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">
        {/* Features Section */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl border border-stone-300 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
            <Layers className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-stone-700 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-800">
              Features
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex items-start space-x-3 sm:space-x-4 md:space-x-6 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-stone-50/50 border border-stone-200/50 hover:bg-stone-100/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-br from-stone-600 to-stone-700 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <feature.icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-stone-800 mb-1 sm:mb-2 text-base sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack Section */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl border border-stone-300 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
            <Code className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-stone-700 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-800">
              Technology Stack
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex items-center justify-between p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-stone-50/50 border border-stone-200/50 hover:bg-stone-100/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="min-w-0 flex-1 pr-4">
                  <h3 className="font-bold text-stone-800 text-base sm:text-lg">
                    {tech.name}
                  </h3>
                  <p className="text-stone-600 mt-1 text-sm sm:text-base">
                    {tech.description}
                  </p>
                </div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-stone-600 to-stone-700 rounded-full flex-shrink-0"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default About
