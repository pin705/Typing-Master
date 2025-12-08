import { User } from '~~/server/models/User'
import { hashPassword, validateEmail, validatePassword, validateUsername } from '~~/server/utils/auth'
import { sendVerificationEmail } from '~~/server/utils/email'
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, username, password } = body

    // Validate required fields
    if (!email || !username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email, username, and password are required',
      })
    }

    // Validate email format
    if (!validateEmail(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format',
      })
    }

    // Validate username
    const usernameValidation = validateUsername(username)
    if (!usernameValidation.valid) {
      throw createError({
        statusCode: 400,
        statusMessage: usernameValidation.message,
      })
    }

    // Validate password
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      throw createError({
        statusCode: 400,
        statusMessage: passwordValidation.message,
      })
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() })
    if (existingEmail) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Email already registered',
      })
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Username already taken',
      })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex')

    // Create new user
    const newUser = await User.create({
      email: email.toLowerCase(),
      username,
      password: hashedPassword,
      provider: 'local',
      emailVerified: false,
      emailVerificationToken: hashedToken,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    })

    // Send verification email (don't fail registration if email fails)
    try {
      await sendVerificationEmail(newUser.email, verificationToken)
    }
    catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      // Continue with registration even if email fails
    }

    // Set user session
    await setUserSession(event, {
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        username: newUser.username,
        avatar: newUser.avatar,
      },
    })

    // Return user data (without password)
    return {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt,
      emailVerified: newUser.emailVerified,
    }
  }
  catch (error: unknown) {
    // If it's already a createError, rethrow it
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    // Log the error for debugging
    console.error('Registration error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error during registration',
    })
  }
})
