<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto max-w-6xl px-4">
      <!-- Loading state -->
      <div
        v-if="loading"
        class="flex items-center justify-center py-20"
      >
        <div class="text-center">
          <div class="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 mx-auto" />
          <p class="mt-4 text-gray-600 dark:text-gray-400">
            Loading profile...
          </p>
        </div>
      </div>

      <!-- Not authenticated -->
      <div
        v-else-if="!isAuthenticated"
        class="flex items-center justify-center py-20"
      >
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please Sign In
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            You need to be signed in to view your profile
          </p>
          <NuxtLink
            to="/"
            class="inline-block rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700"
          >
            Go to Home
          </NuxtLink>
        </div>
      </div>

      <!-- Profile content -->
      <div v-else-if="profile">
        <!-- Profile header -->
        <div class="mb-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
              <div class="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-3xl font-bold text-primary-600">
                {{ profile.user.username[0].toUpperCase() }}
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ profile.user.username }}
                </h1>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ profile.user.email }}
                </p>
                <p
                  v-if="profile.user.bio"
                  class="mt-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  {{ profile.user.bio }}
                </p>
              </div>
            </div>
            <button
              class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              @click="showEditModal = true"
            >
              Edit Profile
            </button>
          </div>
          <div class="mt-4 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>Joined {{ formatDate(profile.user.createdAt) }}</span>
            <span>•</span>
            <span>Last login {{ formatDate(profile.user.lastLoginAt) }}</span>
          </div>
        </div>

        <!-- Statistics -->
        <div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Tests
            </div>
            <div class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {{ profile.statistics.totalTests }}
            </div>
          </div>
          <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Average WPM
            </div>
            <div class="mt-2 text-3xl font-bold text-primary-600">
              {{ profile.statistics.avgWpm }}
            </div>
          </div>
          <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Best WPM
            </div>
            <div class="mt-2 text-3xl font-bold text-green-600">
              {{ profile.statistics.bestWpm }}
            </div>
          </div>
          <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Average Accuracy
            </div>
            <div class="mt-2 text-3xl font-bold text-blue-600">
              {{ profile.statistics.avgAccuracy }}%
            </div>
          </div>
        </div>

        <!-- Recent scores -->
        <div class="mb-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Recent Tests
          </h2>
          <div
            v-if="profile.recentScores.length === 0"
            class="py-8 text-center text-gray-500 dark:text-gray-400"
          >
            No tests yet. Start typing to see your scores here!
          </div>
          <div
            v-else
            class="overflow-x-auto"
          >
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="pb-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Date
                  </th>
                  <th class="pb-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    WPM
                  </th>
                  <th class="pb-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Accuracy
                  </th>
                  <th class="pb-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="score in profile.recentScores"
                  :key="score._id"
                  class="border-b border-gray-100 dark:border-gray-700/50"
                >
                  <td class="py-3 text-sm text-gray-600 dark:text-gray-400">
                    {{ formatDate(score.date) }}
                  </td>
                  <td class="py-3 text-sm font-semibold text-primary-600">
                    {{ score.wpm }}
                  </td>
                  <td class="py-3 text-sm text-gray-700 dark:text-gray-300">
                    {{ score.accuracy }}%
                  </td>
                  <td class="py-3 text-sm text-gray-600 dark:text-gray-400">
                    {{ score.duration }}s
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Settings -->
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 class="mb-6 text-xl font-bold text-gray-900 dark:text-white">
            Account Settings
          </h2>

          <!-- Change Password Section -->
          <div
            v-if="profile.user.provider === 'local'"
            class="mb-6 border-b border-gray-200 pb-6 dark:border-gray-700"
          >
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Change Password
            </h3>
            <button
              class="rounded-lg border border-primary-600 px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 dark:border-primary-500 dark:text-primary-400 dark:hover:bg-primary-900/20"
              @click="showChangePasswordModal = true"
            >
              Change Password
            </button>
          </div>

          <!-- Delete Account Section -->
          <div>
            <h3 class="mb-2 text-lg font-semibold text-red-600 dark:text-red-400">
              Danger Zone
            </h3>
            <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Once you delete your account, there is no going back. All your data will be permanently removed.
            </p>
            <button
              class="rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-900/20"
              @click="showDeleteAccountModal = true"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click.self="showEditModal = false"
    >
      <div class="relative w-full max-w-md rounded-lg bg-white p-8 shadow-2xl dark:bg-gray-800">
        <button
          class="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          @click="showEditModal = false"
        >
          <svg
            class="h-6 w-6"
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
        </button>

        <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Edit Profile
        </h2>

        <div
          v-if="editError"
          class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200"
        >
          {{ editError }}
        </div>

        <form @submit.prevent="handleUpdateProfile">
          <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              v-model="editForm.username"
              type="text"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="mb-6">
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
            <textarea
              v-model="editForm.bio"
              rows="3"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Tell us about yourself..."
            />
          </div>
          <button
            type="submit"
            :disabled="isUpdating"
            class="w-full rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ isUpdating ? 'Saving...' : 'Save Changes' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div
      v-if="showChangePasswordModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click.self="showChangePasswordModal = false"
    >
      <div class="relative w-full max-w-md rounded-lg bg-white p-8 shadow-2xl dark:bg-gray-800">
        <button
          class="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          @click="closeChangePasswordModal"
        >
          <svg
            class="h-6 w-6"
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
        </button>

        <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Change Password
        </h2>

        <div
          v-if="passwordError"
          class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200"
        >
          {{ passwordError }}
        </div>

        <div
          v-if="passwordSuccess"
          class="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-200"
        >
          {{ passwordSuccess }}
        </div>

        <form @submit.prevent="handleChangePassword">
          <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
            <input
              v-model="passwordForm.currentPassword"
              type="password"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              @input="updatePasswordStrength"
            >
            
            <!-- Password Strength Indicator -->
            <div
              v-if="passwordForm.newPassword"
              class="mt-2"
            >
              <div class="mb-1 flex items-center justify-between text-xs">
                <span class="text-gray-600 dark:text-gray-400">Password strength:</span>
                <span
                  :class="{
                    'text-red-600': passwordStrength.score <= 1,
                    'text-orange-600': passwordStrength.score === 2,
                    'text-yellow-600': passwordStrength.score === 3,
                    'text-green-600': passwordStrength.score === 4,
                  }"
                >
                  {{ passwordStrength.feedback }}
                </span>
              </div>
              <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  class="h-full transition-all duration-300"
                  :class="{
                    'bg-red-500': passwordStrength.score <= 1,
                    'bg-orange-500': passwordStrength.score === 2,
                    'bg-yellow-500': passwordStrength.score === 3,
                    'bg-green-500': passwordStrength.score === 4,
                  }"
                  :style="{ width: `${passwordStrength.percentage}%` }"
                />
              </div>
            </div>
          </div>
          <div class="mb-6">
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
          </div>
          <button
            type="submit"
            :disabled="isChangingPassword"
            class="w-full rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ isChangingPassword ? 'Changing...' : 'Change Password' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div
      v-if="showDeleteAccountModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click.self="showDeleteAccountModal = false"
    >
      <div class="relative w-full max-w-md rounded-lg bg-white p-8 shadow-2xl dark:bg-gray-800">
        <button
          class="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          @click="showDeleteAccountModal = false"
        >
          <svg
            class="h-6 w-6"
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
        </button>

        <h2 class="mb-6 text-2xl font-bold text-red-600 dark:text-red-400">
          Delete Account
        </h2>

        <div
          v-if="deleteError"
          class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200"
        >
          {{ deleteError }}
        </div>

        <div class="mb-6">
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
          </p>
          <p class="mb-4 font-semibold text-gray-900 dark:text-white">
            Please type "DELETE" to confirm:
          </p>
          <input
            v-model="deleteForm.confirmation"
            type="text"
            placeholder="Type DELETE"
            class="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
          
          <div v-if="profile?.user.provider === 'local'">
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm your password</label>
            <input
              v-model="deleteForm.password"
              type="password"
              placeholder="Enter your password"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
          </div>
        </div>

        <div class="flex gap-3">
          <button
            type="button"
            class="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            @click="showDeleteAccountModal = false"
          >
            Cancel
          </button>
          <button
            type="button"
            :disabled="isDeletingAccount || deleteForm.confirmation !== 'DELETE' || (profile?.user.provider === 'local' && !deleteForm.password)"
            class="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            @click="handleDeleteAccount"
          >
            {{ isDeletingAccount ? 'Deleting...' : 'Delete Account' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { calculatePasswordStrength, type PasswordStrength } from '~/utils/passwordStrength'

const { isAuthenticated, logout } = useAuth()
const loading = ref(true)

interface ProfileData {
  user: {
    username: string
    email: string
    bio: string
    provider: string
    createdAt: string
    lastLoginAt: string
  }
  statistics: {
    totalTests: number
    avgWpm: number
    bestWpm: number
    avgAccuracy: number
  }
  recentScores: Array<{
    _id: string
    date: string
    wpm: number
    accuracy: number
    duration: number
  }>
}

const profile = ref<ProfileData | null>(null)
const showEditModal = ref(false)
const editError = ref('')
const isUpdating = ref(false)

const editForm = reactive({
  username: '',
  bio: '',
})

// Change Password
const showChangePasswordModal = ref(false)
const passwordError = ref('')
const passwordSuccess = ref('')
const isChangingPassword = ref(false)
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const passwordStrength = ref<PasswordStrength>({
  score: 0,
  feedback: '',
  percentage: 0,
  color: 'red',
})

// Delete Account
const showDeleteAccountModal = ref(false)
const deleteError = ref('')
const isDeletingAccount = ref(false)
const deleteForm = reactive({
  confirmation: '',
  password: '',
})

const fetchProfile = async () => {
  try {
    loading.value = true
    const data = await $fetch('/api/profile') as ProfileData
    profile.value = data
    editForm.username = data.user.username
    editForm.bio = data.user.bio
  }
  catch (error) {
    console.error('Failed to fetch profile:', error)
  }
  finally {
    loading.value = false
  }
}

const handleUpdateProfile = async () => {
  isUpdating.value = true
  editError.value = ''

  try {
    const data = await $fetch('/api/profile', {
      method: 'PUT',
      body: {
        username: editForm.username,
        bio: editForm.bio,
      },
    })

    if (profile.value) {
      // Update only the expected fields
      profile.value.user.username = data.username
      profile.value.user.bio = data.bio
    }
    showEditModal.value = false
  }
  catch (error: unknown) {
    const err = error as { data?: { statusMessage?: string } }
    editError.value = err?.data?.statusMessage || 'Failed to update profile'
  }
  finally {
    isUpdating.value = false
  }
}

const updatePasswordStrength = () => {
  passwordStrength.value = calculatePasswordStrength(passwordForm.newPassword)
}

const closeChangePasswordModal = () => {
  showChangePasswordModal.value = false
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  passwordError.value = ''
  passwordSuccess.value = ''
  passwordStrength.value = {
    score: 0,
    feedback: '',
    percentage: 0,
    color: 'red',
  }
}

const handleChangePassword = async () => {
  passwordError.value = ''
  passwordSuccess.value = ''

  // Validate passwords match
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordError.value = 'New passwords do not match'
    return
  }

  // Validate password strength (at least score 2)
  if (passwordStrength.value.score < 2) {
    passwordError.value = 'Password is too weak. Please choose a stronger password.'
    return
  }

  isChangingPassword.value = true

  try {
    await $fetch('/api/auth/change-password', {
      method: 'POST',
      body: {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      },
    })

    passwordSuccess.value = 'Password changed successfully!'
    
    // Reset form after 2 seconds
    setTimeout(() => {
      closeChangePasswordModal()
    }, 2000)
  }
  catch (error: unknown) {
    const err = error as { data?: { statusMessage?: string } }
    passwordError.value = err?.data?.statusMessage || 'Failed to change password'
  }
  finally {
    isChangingPassword.value = false
  }
}

const handleDeleteAccount = async () => {
  deleteError.value = ''

  if (deleteForm.confirmation !== 'DELETE') {
    deleteError.value = 'Please type DELETE to confirm'
    return
  }

  if (profile.value?.user.provider === 'local' && !deleteForm.password) {
    deleteError.value = 'Password is required'
    return
  }

  isDeletingAccount.value = true

  try {
    await $fetch('/api/profile/delete-account', {
      method: 'DELETE',
      body: {
        password: deleteForm.password,
      },
    })

    // Logout and redirect to home
    await logout()
    navigateTo('/')
  }
  catch (error: unknown) {
    const err = error as { data?: { statusMessage?: string } }
    deleteError.value = err?.data?.statusMessage || 'Failed to delete account'
    isDeletingAccount.value = false
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(() => {
  if (isAuthenticated.value) {
    fetchProfile()
  }
  else {
    loading.value = false
  }
})

watch(isAuthenticated, (newVal) => {
  if (newVal) {
    fetchProfile()
  }
})

definePageMeta({
  title: 'Profile',
})
</script>
