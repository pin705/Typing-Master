import { User } from '~~/server/models/User'
import { sendVerificationEmail } from '~~/server/utils/email'
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
  try {
    // Get current user from session
    const session = await getUserSession(event)
    
    if (!session?.user?.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authenticated',
      })
    }

    // Find user
    const user = await User.findById(session.user.id)
    
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    // Check if already verified
    if (user.emailVerified) {
      return {
        success: true,
        message: 'Email is already verified',
      }
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex')

    // Update user with new token
    user.emailVerificationToken = hashedToken
    user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    await user.save()

    // Send verification email
    const emailResult = await sendVerificationEmail(user.email, verificationToken)

    if (!emailResult.success) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send verification email',
      })
    }

    return {
      success: true,
      message: 'Verification email sent successfully',
    }
  }
  catch (error: any) {
    console.error('Resend verification error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while sending verification email',
    })
  }
})
