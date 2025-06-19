// 'use client'
// import { motion } from 'framer-motion'
// import { Activity, Zap, Eye, Smartphone, Code, Layers } from 'lucide-react'

// const About = () => {
//   const features = [
//     {
//       icon: Activity,
//       title: 'Interactive Visualization',
//       description:
//         'Real-time interactive visualization of service mesh architecture with smooth animations',
//     },
//     {
//       icon: Eye,
//       title: 'Multiple View Modes',
//       description:
//         'Switch between graph and list view modes for different perspectives',
//     },
//     {
//       icon: Zap,
//       title: 'Detailed Metrics',
//       description:
//         'Comprehensive service metrics including traffic, latency, and error rates',
//     },
//     {
//       icon: Smartphone,
//       title: 'Responsive Design',
//       description:
//         'Fully responsive design that works seamlessly across all devices',
//     },
//   ]

//   const technologies = [
//     {
//       name: 'React',
//       description: 'Modern UI library for building interactive interfaces',
//     },
//     {
//       name: 'React Flow',
//       description: 'Powerful library for building node-based editors',
//     },
//     {
//       name: 'D3.js',
//       description: 'Data-driven documents for complex visualizations',
//     },
//     {
//       name: 'Framer Motion',
//       description: 'Production-ready motion library for React',
//     },
//     {
//       name: 'Tailwind CSS',
//       description: 'Utility-first CSS framework for rapid UI development',
//     },
//   ]

//   return (
//     <motion.div
//       className="p-12 md:p-16 lg:p-20 xl:p-24 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 min-h-screen"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.1 }}
//         className="max-w-7xl mx-auto"
//       >
//         <div className="flex items-center space-x-8 mb-16">
//           <div className="w-20 h-20 bg-gradient-to-br from-stone-600 to-stone-700 rounded-3xl flex items-center justify-center shadow-2xl">
//             <Activity className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-stone-800">
//             About Service Mesh Visualizer
//           </h1>
//         </div>
//       </motion.div>

//       <div className="max-w-7xl mx-auto space-y-16">
//         {/* Features Section */}
//         <motion.div
//           className="bg-white/80 backdrop-blur-sm p-12 md:p-16 lg:p-20 rounded-4xl border-2 border-stone-300 shadow-3xl"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <div className="flex items-center space-x-6 mb-12">
//             <Layers className="w-10 h-10 text-stone-700" />
//             <h2 className="text-4xl md:text-5xl font-bold text-stone-800">
//               Features
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 className="flex items-start space-x-8 p-8 rounded-3xl bg-stone-50/50 border-2 border-stone-200/50 hover:bg-stone-100/50 transition-all duration-300"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <div className="w-16 h-16 bg-gradient-to-br from-stone-600 to-stone-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
//                   <feature.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-stone-800 mb-4 text-2xl">
//                     {feature.title}
//                   </h3>
//                   <p className="text-stone-600 leading-relaxed text-lg">
//                     {feature.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Technology Stack Section */}
//         <motion.div
//           className="bg-white/80 backdrop-blur-sm p-12 md:p-16 lg:p-20 rounded-4xl border-2 border-stone-300 shadow-3xl"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           <div className="flex items-center space-x-6 mb-12">
//             <Code className="w-10 h-10 text-stone-700" />
//             <h2 className="text-4xl md:text-5xl font-bold text-stone-800">
//               Technology Stack
//             </h2>
//           </div>

//           <div className="space-y-8">
//             {technologies.map((tech, index) => (
//               <motion.div
//                 key={tech.name}
//                 className="flex items-center justify-between p-8 rounded-3xl bg-stone-50/50 border-2 border-stone-200/50 hover:bg-stone-100/50 transition-all duration-300"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
//                 whileHover={{ scale: 1.01 }}
//               >
//                 <div>
//                   <h3 className="font-bold text-stone-800 text-2xl">
//                     {tech.name}
//                   </h3>
//                   <p className="text-stone-600 mt-2 text-lg">
//                     {tech.description}
//                   </p>
//                 </div>
//                 <div className="w-4 h-4 bg-gradient-to-r from-stone-600 to-stone-700 rounded-full"></div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   )
// }

// export default About
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
      className="p-6 md:p-8 lg:p-12 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 min-h-screen"
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
        <div className="flex items-center space-x-6 mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-stone-600 to-stone-700 rounded-2xl flex items-center justify-center shadow-xl">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800">
            About Service Mesh Visualizer
          </h1>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Features Section */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-stone-300 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-8">
            <Layers className="w-8 h-8 text-stone-700" />
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800">
              Features
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex items-start space-x-6 p-6 rounded-2xl bg-stone-50/50 border border-stone-200/50 hover:bg-stone-100/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-stone-600 to-stone-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed text-base">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack Section */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-stone-300 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center space-x-4 mb-8">
            <Code className="w-8 h-8 text-stone-700" />
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800">
              Technology Stack
            </h2>
          </div>

          <div className="space-y-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex items-center justify-between p-6 rounded-2xl bg-stone-50/50 border border-stone-200/50 hover:bg-stone-100/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div>
                  <h3 className="font-bold text-stone-800 text-lg">
                    {tech.name}
                  </h3>
                  <p className="text-stone-600 mt-1 text-base">
                    {tech.description}
                  </p>
                </div>
                <div className="w-3 h-3 bg-gradient-to-r from-stone-600 to-stone-700 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default About
