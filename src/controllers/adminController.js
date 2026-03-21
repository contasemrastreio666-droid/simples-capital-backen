import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import Lead from '../models/Lead.js'

export async function loginAdmin(req, res) {
  try {
    const { email, senha } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(401).json({ message: 'Credenciais inválidas.' })

    const ok = await bcrypt.compare(senha, admin.senha)
    if (!ok) return res.status(401).json({ message: 'Credenciais inválidas.' })

    const token = jwt.sign(
      { id: admin._id, nome: admin.nome, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return res.json({
      token,
      admin: {
        id: admin._id,
        nome: admin.nome,
        email: admin.email,
      },
    })
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao fazer login.' })
  }
}

export async function listLeadsAdmin(req, res) {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 })
    return res.json(leads)
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar leads.' })
  }
}
