// const express = require('express')
// const cors = require('cors')
// const apiRouter = require('./routes/api.cjs')

// const app = express()
// const PORT = process.env.PORT || 5000

// // Enhanced CORS configuration
// app.use(
//   cors({
//     origin: ['http://localhost:5174', 'http://127.0.0.1:5174'], // Add your frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   })
// )

// // Handle preflight requests
// app.options('*', cors())

// app.use(express.json())
// app.use('/api', apiRouter)

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
//   console.log(`CORS-enabled for http://localhost:5174`)
// })
const express = require('express')
const cors = require('cors')
const apiRouter = require('./routes/api.cjs')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// API routes
app.use('/api', apiRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
