import { defineMongooseModel } from '#nuxt/mongoose'

export const Score = defineMongooseModel({
  name: 'Score',
  schema: {
    user: {
      type: 'ObjectId',
      ref: 'User',
      required: false, // Optional for backward compatibility with anonymous users
    },
    username: {
      type: String,
      required: true,
    },
    wpm: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  options: {
    timestamps: true,
  },
})
