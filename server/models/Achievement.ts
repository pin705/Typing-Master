import { defineMongooseModel } from '#nuxt/mongoose'

export const Achievement = defineMongooseModel({
  name: 'Achievement',
  schema: {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['speed', 'accuracy', 'consistency', 'milestones', 'special'],
      required: true,
    },
    criteria: {
      type: Object,
      required: true,
    },
    points: {
      type: Number,
      default: 10,
    },
    tier: {
      type: String,
      enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond'],
      default: 'bronze',
    },
  },
  options: {
    timestamps: true,
  },
})
