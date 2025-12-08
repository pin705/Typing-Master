import { Score } from '~~/server/models/Score'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    if (!body.username || !body.wpm || !body.accuracy || !body.duration) {
      return createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
      })
    }

    const newScore = await Score.create({
      username: body.username,
      wpm: body.wpm,
      accuracy: body.accuracy,
      duration: body.duration,
    })

    return newScore
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
