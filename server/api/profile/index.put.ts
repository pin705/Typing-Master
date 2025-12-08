import { User } from '~~/server/models/User'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (!session || !session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  try {
    const body = await readBody(event)
    const { username, bio, avatar, settings } = body

    // Get current user
    const user = await User.findById(session.user.id)
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    // Update fields if provided
    if (username && username !== user.username) {
      // Check if new username is already taken
      const existingUser = await User.findOne({ username, _id: { $ne: user._id } })
      if (existingUser) {
        throw createError({
          statusCode: 409,
          statusMessage: 'Username already taken',
        })
      }
      user.username = username
    }

    if (bio !== undefined) {
      user.bio = bio
    }

    if (avatar !== undefined) {
      user.avatar = avatar
    }

    if (settings) {
      if (settings.language) user.settings.language = settings.language
      if (settings.soundEnabled !== undefined) user.settings.soundEnabled = settings.soundEnabled
      if (settings.nightMode !== undefined) user.settings.nightMode = settings.nightMode
    }

    await user.save()

    // Update session with new username
    await setUserSession(event, {
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      },
    })

    return {
      id: user._id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
      settings: user.settings,
    }
  }
  catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('Profile update error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
