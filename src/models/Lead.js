import mongoose from 'mongoose'

const simulationSchema = new mongoose.Schema(
  {
    requestedAmount: String,
    termMonths: String,
    profileType: String,
    historyLevel: String,
    urgency: String,
    monthlyRate: Number,
    installment: Number,
    totalPayment: Number,
    totalInterest: Number,
    annualRate: Number,
    cetMonthly: Number,
    cetAnnual: Number,
  },
  { _id: false }
)

const leadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    birthDate: { type: String, required: true, trim: true },
    cpf: { type: String, required: true, trim: true },
    cnh: { type: String, required: true, trim: true },
    cnhFrontUrl: { type: String, required: true },
    cnhBackUrl: { type: String, required: true },
    simulation: simulationSchema,
    status: {
      type: String,
      enum: ['novo', 'em_contato', 'convertido', 'arquivado'],
      default: 'novo',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Lead', leadSchema)
