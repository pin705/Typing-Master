import { User } from '~/server/models/User'
import { getAllAchievements, getUserAchievements } from '~/server/utils/achievements'

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

    // Get user
    const user = await User.findById(session.user.id)
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found',
      })
    }

    // Get all available achievements
    const allAchievements = getAllAchievements()

    // Get user's earned achievements with details
    const earnedAchievements = getUserAchievements(user.achievements)

    // Calculate progress
    const totalAchievements = allAchievements.length
    const earnedCount = earnedAchievements.length
    const progressPercentage = Math.round((earnedCount / totalAchievements) * 100)

    return {
      success: true,
      data: {
        earned: earnedAchievements,
        all: allAchievements,
        stats: {
          total: totalAchievements,
          earned: earnedCount,
          progress: progressPercentage,
          level: user.level || 1,
          experience: user.experience || 0,
          nextLevelXP: ((user.level || 1) * 100),
        },
      },
    }
  }
  catch (error: any) {
    console.error('Get achievements error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to get achievements',
    })
  }
})
