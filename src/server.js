import dotenv from 'dotenv'
import app from './app.js'
import { connectDatabase } from './config/db.js'

dotenv.config()

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await connectDatabase()
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error.message)
    process.exit(1)
  }
}

start()
