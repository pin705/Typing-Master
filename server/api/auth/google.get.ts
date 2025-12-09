import { User } from '~~/server/models/User'

export default oauthGoogleEventHandler({
  async onSuccess(event, { user }) {
    try {
      // Check if user already exists with this Google ID
      let existingUser = await User.findOne({
        provider: 'google',
        providerId: user.sub,
      })

      // Also check in linked providers
      if (!existingUser) {
        existingUser = await User.findOne({
          'linkedProviders.provider': 'google',
          'linkedProviders.providerId': user.sub,
        })
      }

      if (!existingUser) {
        // Check if user exists with this email
        existingUser = await User.findOne({
          email: user.email,
        })

        if (existingUser) {
          // Link Google account to existing user
          if (existingUser.provider === 'local') {
            // If current provider is local, add Google as linked provider
            const alreadyLinked = existingUser.linkedProviders.some(
              p => p.provider === 'google' && p.providerId === user.sub,
            )
            if (!alreadyLinked) {
              existingUser.linkedProviders.push({
                provider: 'google',
                providerId: user.sub,
                linkedAt: new Date(),
              })
            }
          }
          else {
            // Switch to Google as primary provider if from another OAuth
            const currentProvider = existingUser.provider
            const currentProviderId = existingUser.providerId

            existingUser.provider = 'google'
            existingUser.providerId = user.sub

            // Add the old provider to linked providers if not already there
            if (currentProvider !== 'local') {
              const alreadyLinked = existingUser.linkedProviders.some(
                p => p.provider === currentProvider && p.providerId === currentProviderId,
              )
              if (!alreadyLinked) {
                existingUser.linkedProviders.push({
                  provider: currentProvider as 'google' | 'github',
                  providerId: currentProviderId,
                  linkedAt: new Date(),
                })
              }
            }
          }
          existingUser.emailVerified = true // OAuth emails are verified
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
            emailVerified: true, // OAuth users are pre-verified
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
