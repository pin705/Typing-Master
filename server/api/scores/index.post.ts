import { Score } from '~~/server/models/Score'
import { checkAndAwardAchievements } from '~~/server/utils/achievements'

interface ScoreData {
  username: string
  wpm: number
  accuracy: number
  duration: number
  user?: string
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const session = await getUserSession(event)

    if (!body.username || !body.wpm || !body.accuracy || !body.duration) {
      return createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
      })
    }

    // Create score with user reference if logged in
    const scoreData: ScoreData = {
      username: body.username,
      wpm: body.wpm,
      accuracy: body.accuracy,
      duration: body.duration,
    }

    // Link to user if authenticated
    if (session && session.user) {
      scoreData.user = session.user.id
    }

    const newScore = await Score.create(scoreData)

    // Check for new achievements if user is authenticated
    let newAchievements = []
    if (session && session.user) {
      newAchievements = await checkAndAwardAchievements(session.user.id)
    }

    return {
      score: newScore,
      newAchievements: newAchievements.length > 0 ? newAchievements : undefined,
    }
  }
  catch (_error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
