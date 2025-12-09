import { User } from '~~/server/models/User'

export default oauthGitHubEventHandler({
  async onSuccess(event, { user }) {
    try {
      // Check if user already exists with this GitHub ID
      let existingUser = await User.findOne({
        provider: 'github',
        providerId: user.id.toString(),
      })

      // Also check in linked providers
      if (!existingUser) {
        existingUser = await User.findOne({
          'linkedProviders.provider': 'github',
          'linkedProviders.providerId': user.id.toString(),
        })
      }

      if (!existingUser) {
        // Check if user exists with this email
        existingUser = await User.findOne({
          email: user.email,
        })

        if (existingUser) {
          // Link GitHub account to existing user
          if (existingUser.provider === 'local') {
            // If current provider is local, add GitHub as linked provider
            const alreadyLinked = existingUser.linkedProviders.some(
              p => p.provider === 'github' && p.providerId === user.id.toString(),
            )
            if (!alreadyLinked) {
              existingUser.linkedProviders.push({
                provider: 'github',
                providerId: user.id.toString(),
                linkedAt: new Date(),
              })
            }
          }
          else {
            // Switch to GitHub as primary provider if from another OAuth
            const currentProvider = existingUser.provider
            const currentProviderId = existingUser.providerId

            existingUser.provider = 'github'
            existingUser.providerId = user.id.toString()

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
          if (user.avatar_url && !existingUser.avatar) {
            existingUser.avatar = user.avatar_url
          }
          await existingUser.save()
        }
        else {
          // Create new user
          const username = user.login || user.email?.split('@')[0] || `user_${Date.now()}`
          existingUser = await User.create({
            email: user.email,
            username,
            avatar: user.avatar_url || '',
            provider: 'github',
            providerId: user.id.toString(),
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
      console.error('GitHub OAuth error:', error)
      return sendRedirect(event, '/?error=oauth-failed')
    }
  },
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/?error=oauth-failed')
  },
})
