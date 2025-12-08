import { defineMongooseModel } from '#nuxt/mongoose'

export const PasswordResetToken = defineMongooseModel({
  name: 'PasswordResetToken',
  schema: {
    userId: {
      type: 'ObjectId',
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  options: {
    timestamps: true,
  },
})
