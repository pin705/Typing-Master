import { User } from '~~/server/models/User'
import { verifyPassword } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, rememberMe } = body

    // Validate required fields
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      })
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password',
      })
    }

    // Check if user has a password (OAuth users don't)
    if (!user.password) {
      throw createError({
        statusCode: 401,
        statusMessage: 'This account uses social login. Please use the appropriate login method.',
      })
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password',
      })
    }

    // Update last login time
    user.lastLoginAt = new Date()
    await user.save()

    // Set user session with extended maxAge if rememberMe is true
    await setUserSession(event, {
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      },
    }, {
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined, // 30 days if remember me, otherwise default (session)
    })

    // Return user data (without password)
    return {
      id: user._id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      lastLoginAt: user.lastLoginAt,
    }
  }
  catch (error: unknown) {
    // If it's already a createError, rethrow it
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    // Log the error for debugging
    console.error('Login error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error during login',
    })
  }
})
