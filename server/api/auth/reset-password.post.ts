import { User } from '~~/server/models/User'
import { PasswordResetToken } from '~~/server/models/PasswordResetToken'
import { hashPassword } from '~~/server/utils/auth'
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { token, password } = body

    // Validate inputs
    if (!token || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Token and password are required',
      })
    }

    // Validate password
    if (password.length < 8) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must be at least 8 characters long',
      })
    }

    if (!/[A-Z]/.test(password)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must contain at least one uppercase letter',
      })
    }

    if (!/[a-z]/.test(password)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must contain at least one lowercase letter',
      })
    }

    if (!/\d/.test(password)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must contain at least one number',
      })
    }

    // Hash the token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    // Find the reset token
    const resetToken = await PasswordResetToken.findOne({
      token: hashedToken,
      used: false,
      expiresAt: { $gt: new Date() },
    })

    if (!resetToken) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid or expired reset token',
      })
    }

    // Find the user
    const user = await User.findById(resetToken.userId)

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password)

    // Update user password
    user.password = hashedPassword
    await user.save()

    // Mark token as used
    resetToken.used = true
    await resetToken.save()

    return {
      success: true,
      message: 'Password has been reset successfully',
    }
  }
  catch (error: any) {
    console.error('Reset password error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while resetting your password',
    })
  }
})
