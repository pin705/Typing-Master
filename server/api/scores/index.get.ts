import { Score } from '~~/server/models/Score'

export default defineEventHandler(async (event) => {
  try {
    const scores = await Score.find()
      .sort({ wpm: -1, accuracy: -1 })
      .limit(10)
    return scores
  }
  catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
