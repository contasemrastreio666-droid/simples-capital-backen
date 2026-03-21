import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import Admin from '../src/models/Admin.js'

dotenv.config()

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const email = process.env.ADMIN_EMAIL || 'admin@simplescapital.com'
    const exists = await Admin.findOne({ email })

    if (exists) {
      console.log('Administrador já existe.')
      process.exit(0)
    }

    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || '123456', 10)

    await Admin.create({
      nome: process.env.ADMIN_NAME || 'Administrador',
      email,
      senha: hash,
    })

    console.log('Admin criado com sucesso!')
    process.exit(0)
  } catch (error) {
    console.error('Erro ao criar admin:', error.message)
    process.exit(1)
  }
}

run()
