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
