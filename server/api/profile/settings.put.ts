import { User } from '~~/server/models/User'

export default defineEventHandler(async (event) => {
  // Get user session
  const session = await getUserSession(event)

  if (!session?.user?.email) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You must be logged in to update settings',
    })
  }

  // Get request body
  const body = await readBody(event)
  const { language, soundEnabled, nightMode } = body

  // Get user from database
  const user = await User.findOne({ email: session.user.email })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  // Update settings
  if (language !== undefined) {
    user.settings.language = language
  }
  if (soundEnabled !== undefined) {
    user.settings.soundEnabled = soundEnabled
  }
  if (nightMode !== undefined) {
    user.settings.nightMode = nightMode
  }

  await user.save()

  return {
    success: true,
    settings: user.settings,
  }
})
