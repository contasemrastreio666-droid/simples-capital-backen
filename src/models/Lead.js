import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    birthDate: { type: String, required: true, trim: true },
    cpf: { type: String, required: true, trim: true },
    cnh: { type: String, required: true, trim: true },
    simulation: {
      desiredAmount: { type: String, trim: true },
      urgency: { type: String, trim: true },
      profileType: { type: String, trim: true },
      historyLevel: { type: String, trim: true },
    },
    status: {
      type: String,
      enum: ['novo', 'em_contato', 'convertido', 'arquivado'],
      default: 'novo',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Lead', leadSchema)
