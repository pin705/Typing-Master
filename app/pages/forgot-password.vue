<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 dark:bg-gray-900 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-md">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Forgot Password
        </h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div class="mt-8 rounded-lg bg-white p-8 shadow dark:bg-gray-800">
        <!-- Success message -->
        <div
          v-if="successMessage"
          class="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-200"
        >
          {{ successMessage }}
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
          <div class="mb-6">
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="your@email.com"
            >
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
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
const email = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value },
    })

    if (response.success) {
      successMessage.value = response.message
      email.value = ''
    }
  }
  catch (error: any) {
    errorMessage.value = error.data?.statusMessage || 'Failed to send reset link. Please try again.'
  }
  finally {
    isLoading.value = false
  }
}

useHead({
  title: 'Forgot Password - Typing Master',
})
</script>
