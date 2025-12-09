import { User } from '~~/server/models/User'
import { hashPassword, validatePassword, verifyPassword } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  // Get user session
  const session = await getUserSession(event)

  if (!session?.user?.email) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You must be logged in to change password',
    })
  }

  // Get request body
  const body = await readBody(event)
  const { currentPassword, newPassword } = body

  // Validate input
  if (!currentPassword || !newPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Current password and new password are required',
    })
  }

  // Validate new password
  const passwordValidation = validatePassword(newPassword)
  if (!passwordValidation.valid) {
    throw createError({
      statusCode: 400,
      statusMessage: passwordValidation.message,
    })
  }

  // Get user from database
  const user = await User.findOne({ email: session.user.email })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  // Check if user has a password (OAuth users might not have one)
  if (!user.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cannot change password for OAuth accounts. Password not set.',
    })
  }

  // Verify current password
  const isPasswordValid = await verifyPassword(currentPassword, user.password)

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Current password is incorrect',
    })
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword)

  // Update user password
  user.password = hashedPassword
  await user.save()

  return {
    success: true,
    message: 'Password changed successfully',
  }
})
