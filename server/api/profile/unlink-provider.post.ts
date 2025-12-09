import { User } from '~~/server/models/User'

export default defineEventHandler(async (event) => {
  try {
    // Get current user session
    const session = await getUserSession(event)
    if (!session || !session.user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      })
    }

    // Get the provider to unlink from request body
    const body = await readBody(event)
    const { provider } = body

    if (!provider || !['google', 'github'].includes(provider)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid provider',
      })
    }

    // Get user
    const user = await User.findById(session.user.id)
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found',
      })
    }

    // Check if this is the current primary provider
    if (user.provider === provider) {
      // User must have a password or another linked provider before unlinking
      if (!user.password && user.linkedProviders.length === 0) {
        throw createError({
          statusCode: 400,
          message: 'Cannot unlink your only authentication method. Please set a password first.',
        })
      }

      // Switch to local if password exists, or to another linked provider
      if (user.password) {
        user.provider = 'local'
        user.providerId = ''
      }
      else if (user.linkedProviders.length > 0) {
        // Switch to the first linked provider
        const firstLinked = user.linkedProviders[0]
        user.provider = firstLinked.provider
        user.providerId = firstLinked.providerId
        // Remove it from linked providers
        user.linkedProviders = user.linkedProviders.filter(p => p.provider !== firstLinked.provider)
      }
    }
    else {
      // Remove from linked providers
      user.linkedProviders = user.linkedProviders.filter(p => p.provider !== provider)
    }

    await user.save()

    return {
      success: true,
      message: `${provider} account unlinked successfully`,
      user: {
        provider: user.provider,
        linkedProviders: user.linkedProviders,
      },
    }
  }
  catch (error: any) {
    console.error('Provider unlink error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to unlink provider',
    })
  }
})
