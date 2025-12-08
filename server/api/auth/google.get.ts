import { User } from '~~/server/models/User'

export default oauthGoogleEventHandler({
  async onSuccess(event, { user }) {
    try {
      // Check if user already exists with this Google ID
      let existingUser = await User.findOne({
        provider: 'google',
        providerId: user.sub,
      })

      if (!existingUser) {
        // Check if user exists with this email
        existingUser = await User.findOne({
          email: user.email,
        })

        if (existingUser) {
          // Link Google account to existing user
          existingUser.provider = 'google'
          existingUser.providerId = user.sub
          if (user.picture && !existingUser.avatar) {
            existingUser.avatar = user.picture
          }
          await existingUser.save()
        }
        else {
          // Create new user
          const username = user.email?.split('@')[0] || `user_${Date.now()}`
          existingUser = await User.create({
            email: user.email,
            username,
            avatar: user.picture || '',
            provider: 'google',
            providerId: user.sub,
            lastLoginAt: new Date(),
          })
        }
      }
      else {
        // Update last login
        existingUser.lastLoginAt = new Date()
        await existingUser.save()
      }

      // Create session
      await setUserSession(event, {
        user: {
          id: existingUser._id.toString(),
          email: existingUser.email,
          username: existingUser.username,
        },
      })

      return sendRedirect(event, '/')
    }
    catch (error) {
      console.error('Google OAuth error:', error)
      return sendRedirect(event, '/?error=oauth-failed')
    }
  },
  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/?error=oauth-failed')
  },
})
