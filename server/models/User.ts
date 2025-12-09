import { defineMongooseModel } from '#nuxt/mongoose'

export const User = defineMongooseModel({
  name: 'User',
  schema: {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: false, // Not required for OAuth users
    },
    avatar: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
      maxlength: 500,
    },
    provider: {
      type: String,
      enum: ['local', 'google', 'github'],
      default: 'local',
    },
    providerId: {
      type: String,
      default: '',
    },
    // Support for multiple linked OAuth providers
    linkedProviders: {
      type: [{
        provider: {
          type: String,
          enum: ['google', 'github'],
        },
        providerId: String,
        linkedAt: {
          type: Date,
          default: Date.now,
        },
      }],
      default: [],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: '',
    },
    emailVerificationExpires: {
      type: Date,
      default: null,
    },
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
    // Achievement tracking
    achievements: {
      type: [{
        type: String,
      }],
      default: [],
    },
    // User level and experience
    level: {
      type: Number,
      default: 1,
    },
    experience: {
      type: Number,
      default: 0,
    },
    settings: {
      language: {
        type: String,
        default: 'en',
      },
      soundEnabled: {
        type: Boolean,
        default: true,
      },
      nightMode: {
        type: Boolean,
        default: false,
      },
      profileVisibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
      },
      emailNotifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  options: {
    timestamps: true, // This adds createdAt and updatedAt automatically
  },
})
