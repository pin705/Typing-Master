import { User } from '~~/server/models/User'
import { Score } from '~~/server/models/Score'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (!session || !session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  try {
    // Get user details
    const user = await User.findById(session.user.id).select('-password')
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    // Get user's scores
    const scores = await Score.find({ user: session.user.id })
      .sort({ date: -1 })
      .limit(50)

    // Calculate statistics
    const totalTests = scores.length
    const avgWpm = totalTests > 0
      ? scores.reduce((sum, score) => sum + score.wpm, 0) / totalTests
      : 0
    const avgAccuracy = totalTests > 0
      ? scores.reduce((sum, score) => sum + score.accuracy, 0) / totalTests
      : 0
    const bestWpm = totalTests > 0
      ? Math.max(...scores.map(score => score.wpm))
      : 0
    const bestAccuracy = totalTests > 0
      ? Math.max(...scores.map(score => score.accuracy))
      : 0

    return {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
        settings: user.settings,
      },
      statistics: {
        totalTests,
        avgWpm: Math.round(avgWpm * 10) / 10,
        avgAccuracy: Math.round(avgAccuracy * 10) / 10,
        bestWpm,
        bestAccuracy,
      },
      recentScores: scores.slice(0, 10),
    }
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    console.error('Profile error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
