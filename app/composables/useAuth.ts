export const useAuth = () => {
  const user = useState<{
    id: string
    email: string
    username: string
    avatar: string
  } | null>('user', () => null)
  const loading = useState('authLoading', () => false)

  const fetchUser = async () => {
    try {
      loading.value = true
      const data = await $fetch('/api/auth/user')
      user.value = data
    }
    catch {
      user.value = null
    }
    finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      const data = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password, rememberMe },
      })
      user.value = data
      return { success: true, user: data }
    }
    catch (error: unknown) {
      const err = error as { data?: { statusMessage?: string } }
      const message = err?.data?.statusMessage || 'Login failed'
      return { success: false, error: message }
    }
  }

  const register = async (email: string, username: string, password: string) => {
    try {
      const data = await $fetch('/api/auth/register', {
        method: 'POST',
        body: { email, username, password },
      })
      user.value = data
      return { success: true, user: data }
    }
    catch (error: unknown) {
      const err = error as { data?: { statusMessage?: string } }
      const message = err?.data?.statusMessage || 'Registration failed'
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
      })
      user.value = null
      // Redirect to home page
      navigateTo('/')
    }
    catch (error) {
      console.error('Logout error:', error)
    }
  }

  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    loading,
    isAuthenticated,
    fetchUser,
    login,
    register,
    logout,
  }
}
