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

    // Get the uploaded image data from request body
    const body = await readBody(event)
    const { avatar } = body

    if (!avatar) {
      throw createError({
        statusCode: 400,
        message: 'Avatar data is required',
      })
    }

    // Validate base64 image format
    if (!avatar.startsWith('data:image/')) {
      throw createError({
        statusCode: 400,
        message: 'Invalid image format. Please upload a valid image.',
      })
    }

    // Check image size (limit to 5MB base64)
    const base64Length = avatar.length - avatar.indexOf(',') - 1
    const sizeInBytes = (base64Length * 3) / 4
    const sizeInMB = sizeInBytes / (1024 * 1024)

    if (sizeInMB > 5) {
      throw createError({
        statusCode: 400,
        message: 'Image size must be less than 5MB',
      })
    }

    // Update user avatar
    const user = await User.findById(session.user.id)
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found',
      })
    }

    user.avatar = avatar
    await user.save()

    return {
      success: true,
      message: 'Avatar updated successfully',
      avatar: user.avatar,
    }
  }
  catch (error: any) {
    console.error('Avatar upload error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to upload avatar',
    })
  }
})
