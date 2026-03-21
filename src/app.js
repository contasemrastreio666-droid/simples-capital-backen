import express from 'express'
import cors from 'cors'
import leadRoutes from './routes/leadRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API Simples Capital no ar.' })
})

app.use('/api/leads', leadRoutes)
app.use('/api/admin', adminRoutes)

export default app
