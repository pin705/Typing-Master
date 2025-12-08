<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 dark:bg-gray-900 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-md">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Reset Password
        </h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter your new password below.
        </p>
      </div>

      <div class="mt-8 rounded-lg bg-white p-8 shadow dark:bg-gray-800">
        <!-- Success message -->
        <div
          v-if="successMessage"
          class="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-200"
        >
          {{ successMessage }}
          <div class="mt-4">
            <NuxtLink
              to="/"
              class="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Go to Login →
            </NuxtLink>
          </div>
        </div>

        <!-- Error message -->
        <div
          v-if="errorMessage"
          class="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200"
        >
          {{ errorMessage }}
        </div>

        <!-- Form -->
        <form
          v-if="!successMessage"
          @submit.prevent="handleSubmit"
        >
          <div class="mb-4">
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="••••••••"
            >
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              At least 8 characters, one uppercase, one lowercase, and one number
            </p>
          </div>

          <div class="mb-6">
            <label
              for="confirmPassword"
              class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="••••••••"
            >
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ isLoading ? 'Resetting...' : 'Reset Password' }}
          </button>
        </form>

        <!-- Back to login -->
        <div class="mt-6 text-center">
          <NuxtLink
            to="/"
            class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            ← Back to Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const token = ref(route.query.token as string || '')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  // Validate passwords match
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    isLoading.value = false
    return
  }

  try {
    const response = await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token: token.value,
        password: password.value,
      },
    })

    if (response.success) {
      successMessage.value = response.message
      password.value = ''
      confirmPassword.value = ''
    }
  }
  catch (error: any) {
    errorMessage.value = error.data?.statusMessage || 'Failed to reset password. Please try again.'
  }
  finally {
    isLoading.value = false
  }
}

// Check if token is present
onMounted(() => {
  if (!token.value) {
    errorMessage.value = 'Invalid or missing reset token'
  }
})

useHead({
  title: 'Reset Password - Typing Master',
})
</script>
