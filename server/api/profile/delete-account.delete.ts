import { User } from '~~/server/models/User'
import { Score } from '~~/server/models/Score'
import { verifyPassword } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  // Get user session
  const session = await getUserSession(event)

  if (!session?.user?.email) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You must be logged in to delete your account',
    })
  }

  // Get request body
  const body = await readBody(event)
  const { password } = body

  // Get user from database
  const user = await User.findOne({ email: session.user.email })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  // If user has a password (local auth), verify it
  if (user.provider === 'local') {
    if (!password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password is required to delete account',
      })
    }

    if (!user.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password not set for this account',
      })
    }

    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Incorrect password',
      })
    }
  }

  try {
    // Delete all user's scores
    await Score.deleteMany({ user: user._id })

    // Delete user
    await User.deleteOne({ _id: user._id })

    // Clear session
    await clearUserSession(event)

    return {
      success: true,
      message: 'Account deleted successfully',
    }
  }
  catch (error) {
    console.error('Error deleting account:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete account',
    })
  }
})
