import Lead from '../models/Lead.js'

export async function createLead(req, res) {
  try {
    const {
      fullName,
      email,
      phone,
      birthDate,
      cpf,
      cnh,
      simulation,
    } = req.body

    if (!fullName || !email || !phone || !birthDate || !cpf || !cnh) {
      return res.status(400).json({ message: 'Preencha todos os dados obrigatórios do cadastro.' })
    }

    const lead = await Lead.create({
      fullName,
      email,
      phone,
      birthDate,
      cpf,
      cnh,
      simulation: simulation || {},
    })

    return res.status(201).json(lead)
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar lead.' })
  }
}

export async function updateLeadStatus(req, res) {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['novo', 'em_contato', 'convertido', 'arquivado'].includes(status)) {
      return res.status(400).json({ message: 'Status inválido.' })
    }

    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true })

    if (!lead) {
      return res.status(404).json({ message: 'Lead não encontrado.' })
    }

    return res.json(lead)
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar lead.' })
  }
}

export async function deleteLead(req, res) {
  try {
    const { id } = req.params
    const lead = await Lead.findByIdAndDelete(id)

    if (!lead) {
      return res.status(404).json({ message: 'Lead não encontrado.' })
    }

    return res.json({ message: 'Lead removido com sucesso.' })
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao remover lead.' })
  }
}
