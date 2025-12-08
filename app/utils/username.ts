export function generateGuestUsername(): string {
  return 'Guest ' + Math.floor(Math.random() * 1000)
}

export function getStoredUsername(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('typing_username')
}

export function setStoredUsername(username: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('typing_username', username)
}

export function hasCompletedSetup(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('typing_setup_completed') === 'true'
}

export function markSetupCompleted(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('typing_setup_completed', 'true')
}
