import { User } from '~~/server/models/User'
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { token } = body

    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Verification token is required',
      })
    }

    // Hash the token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    // Find user with this token
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: new Date() },
    })

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid or expired verification token',
      })
    }

    // Mark email as verified
    user.emailVerified = true
    user.emailVerificationToken = ''
    user.emailVerificationExpires = null
    await user.save()

    return {
      success: true,
      message: 'Email verified successfully',
    }
  }
  catch (error: any) {
    console.error('Email verification error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while verifying your email',
    })
  }
})
