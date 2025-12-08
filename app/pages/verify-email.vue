<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 dark:bg-gray-900 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-md">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Email Verification
        </h1>
      </div>

      <div class="mt-8 rounded-lg bg-white p-8 shadow dark:bg-gray-800">
        <!-- Loading state -->
        <div
          v-if="isVerifying"
          class="text-center"
        >
          <div class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-primary-600" />
          <p class="text-gray-600 dark:text-gray-400">
            Verifying your email...
          </p>
        </div>

        <!-- Success message -->
        <div
          v-else-if="successMessage"
          class="text-center"
        >
          <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <svg
              class="h-6 w-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            Email Verified!
          </h2>
          <p class="mb-6 text-gray-600 dark:text-gray-400">
            {{ successMessage }}
          </p>
          <NuxtLink
            to="/"
            class="inline-block rounded-lg bg-primary-600 px-6 py-2 font-semibold text-white hover:bg-primary-700"
          >
            Go to Home
          </NuxtLink>
        </div>

        <!-- Error message -->
        <div
          v-else-if="errorMessage"
          class="text-center"
        >
          <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <svg
              class="h-6 w-6 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            Verification Failed
          </h2>
          <p class="mb-6 text-red-600 dark:text-red-400">
            {{ errorMessage }}
          </p>
          <div class="space-y-3">
            <button
              v-if="canResend"
              :disabled="isResending"
              class="w-full rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
              @click="resendVerification"
            >
              {{ isResending ? 'Sending...' : 'Resend Verification Email' }}
            </button>
            <NuxtLink
              to="/"
              class="block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Go to Home
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const token = ref(route.query.token as string || '')
const isVerifying = ref(false)
const isResending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const canResend = ref(false)

const verifyEmail = async () => {
  if (!token.value) {
    errorMessage.value = 'Invalid or missing verification token'
    return
  }

  isVerifying.value = true

  try {
    const response = await $fetch('/api/auth/verify-email', {
      method: 'POST',
      body: { token: token.value },
    })

    if (response.success) {
      successMessage.value = response.message
    }
  }
  catch (error: any) {
    errorMessage.value = error.data?.statusMessage || 'Failed to verify email. The link may have expired.'
    canResend.value = true
  }
  finally {
    isVerifying.value = false
  }
}

const resendVerification = async () => {
  isResending.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch('/api/auth/resend-verification', {
      method: 'POST',
    })

    if (response.success) {
      successMessage.value = 'A new verification email has been sent. Please check your inbox.'
      errorMessage.value = ''
      canResend.value = false
    }
  }
  catch (error: any) {
    errorMessage.value = error.data?.statusMessage || 'Failed to resend verification email. Please try again later.'
  }
  finally {
    isResending.value = false
  }
}

onMounted(() => {
  verifyEmail()
})

useHead({
  title: 'Verify Email - Typing Master',
})
</script>
