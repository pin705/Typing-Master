import { Score } from '~~/server/models/Score'

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
    const scoreData: any = {
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

    return newScore
  }
  catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
