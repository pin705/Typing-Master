export const useUserSettings = () => {
  const { isAuthenticated } = useAuth()
  
  // Local state for settings
  const settings = useState('userSettings', () => ({
    language: 'en',
    soundEnabled: true,
    nightMode: false,
  }))

  const isLoading = ref(false)

  // Load settings from database (for authenticated users)
  const loadSettings = async () => {
    if (!isAuthenticated.value) {
      // Load from localStorage for non-authenticated users (client-side only)
      if (process.client) {
        try {
          const saved = localStorage.getItem('userSettings')
          if (saved) {
            const parsed = JSON.parse(saved)
            settings.value = { ...settings.value, ...parsed }
          }
        }
        catch (error) {
          console.error('Failed to parse saved settings:', error)
        }
      }
      return
    }

    // Load from API for authenticated users
    try {
      isLoading.value = true
      const profile = await $fetch('/api/profile')
      if (profile?.user?.settings) {
        settings.value = {
          language: profile.user.settings.language || 'en',
          soundEnabled: profile.user.settings.soundEnabled ?? true,
          nightMode: profile.user.settings.nightMode ?? false,
        }
      }
    }
    catch (error) {
      console.error('Failed to load settings:', error)
    }
    finally {
      isLoading.value = false
    }
  }

  // Save settings to database or localStorage
  const saveSettings = async (newSettings: Partial<typeof settings.value>) => {
    // Update local state
    settings.value = { ...settings.value, ...newSettings }

    if (!isAuthenticated.value) {
      // Save to localStorage for non-authenticated users (client-side only)
      if (process.client) {
        localStorage.setItem('userSettings', JSON.stringify(settings.value))
      }
      return
    }

    // Save to API for authenticated users
    try {
      await $fetch('/api/profile/settings', {
        method: 'PUT',
        body: newSettings,
      })
    }
    catch (error) {
      console.error('Failed to save settings:', error)
    }
  }

  // Update individual setting
  const updateSetting = async <K extends keyof typeof settings.value>(
    key: K,
    value: typeof settings.value[K],
  ) => {
    await saveSettings({ [key]: value })
  }

  return {
    settings: readonly(settings),
    isLoading: readonly(isLoading),
    loadSettings,
    saveSettings,
    updateSetting,
  }
}
