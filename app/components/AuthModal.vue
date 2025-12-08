<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    @click.self="closeModal"
  >
    <div class="relative w-full max-w-md rounded-lg bg-white p-8 shadow-2xl dark:bg-gray-800">
      <!-- Close button -->
      <button
        class="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        @click="closeModal"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Header -->
      <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        {{ mode === 'login' ? 'Sign In' : 'Create Account' }}
      </h2>

      <!-- Error message -->
      <div v-if="error" class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
        {{ error }}
      </div>

      <!-- Login form -->
      <form v-if="mode === 'login'" @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            v-model="loginForm.email"
            type="email"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="your@email.com"
          >
        </div>
        <div class="mb-6">
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            v-model="loginForm.password"
            type="password"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="••••••••"
          >
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="mb-4 w-full rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <!-- Register form -->
      <form v-else @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            v-model="registerForm.email"
            type="email"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="your@email.com"
          >
        </div>
        <div class="mb-4">
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <input
            v-model="registerForm.username"
            type="text"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="username"
          >
        </div>
        <div class="mb-6">
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            v-model="registerForm.password"
            type="password"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="••••••••"
          >
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            At least 8 characters, one uppercase, one lowercase, and one number
          </p>
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="mb-4 w-full rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ isLoading ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>

      <!-- Toggle mode -->
      <div class="text-center text-sm text-gray-600 dark:text-gray-400">
        {{ mode === 'login' ? "Don't have an account?" : 'Already have an account?' }}
        <button
          class="ml-1 font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
          @click="toggleMode"
        >
          {{ mode === 'login' ? 'Sign up' : 'Sign in' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  initialMode?: 'login' | 'register'
}>()

const emit = defineEmits<{
  close: []
  success: []
}>()

const { login, register } = useAuth()

const mode = ref<'login' | 'register'>(props.initialMode || 'login')
const isLoading = ref(false)
const error = ref('')

const loginForm = reactive({
  email: '',
  password: '',
})

const registerForm = reactive({
  email: '',
  username: '',
  password: '',
})

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login'
  error.value = ''
}

const closeModal = () => {
  error.value = ''
  emit('close')
}

const handleLogin = async () => {
  isLoading.value = true
  error.value = ''

  const result = await login(loginForm.email, loginForm.password)

  if (result.success) {
    emit('success')
    closeModal()
  }
  else {
    error.value = result.error || 'Login failed'
  }

  isLoading.value = false
}

const handleRegister = async () => {
  isLoading.value = true
  error.value = ''

  const result = await register(
    registerForm.email,
    registerForm.username,
    registerForm.password,
  )

  if (result.success) {
    emit('success')
    closeModal()
  }
  else {
    error.value = result.error || 'Registration failed'
  }

  isLoading.value = false
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    error.value = ''
  }
})
</script>
