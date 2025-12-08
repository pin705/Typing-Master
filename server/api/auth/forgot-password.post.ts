import { User } from '~~/server/models/User'
import { PasswordResetToken } from '~~/server/models/PasswordResetToken'
import { sendPasswordResetEmail } from '~~/server/utils/email'
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email } = body

    // Validate email
    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email is required',
      })
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() })
    
    // Always return success to prevent email enumeration
    // Even if user doesn't exist, we return success for security
    if (!user) {
      return {
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      }
    }

    // Check if user uses OAuth (can't reset password for OAuth users)
    if (user.provider !== 'local') {
      return {
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      }
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Delete any existing reset tokens for this user
    await PasswordResetToken.deleteMany({ userId: user._id })

    // Create new reset token (expires in 1 hour)
    await PasswordResetToken.create({
      userId: user._id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      used: false,
    })

    // Send password reset email
    const emailResult = await sendPasswordResetEmail(user.email, resetToken)

    if (!emailResult.success) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send password reset email',
      })
    }

    return {
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.',
    }
  }
  catch (error: any) {
    console.error('Forgot password error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while processing your request',
    })
  }
})
