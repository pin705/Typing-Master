export interface PasswordStrength {
  score: number // 0-4 (0 = very weak, 4 = very strong)
  feedback: string
  percentage: number // 0-100
  color: string // For UI display
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0
  const feedback: string[] = []

  // Length check
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (password.length >= 16) score++

  // Character variety checks
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++ // Special characters

  // Normalize score to 0-4 range
  const normalizedScore = Math.min(Math.floor(score / 2), 4)

  // Generate feedback
  if (password.length < 8) {
    feedback.push('Use at least 8 characters')
  }
  if (!/[a-z]/.test(password)) {
    feedback.push('Add lowercase letters')
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push('Add uppercase letters')
  }
  if (!/[0-9]/.test(password)) {
    feedback.push('Add numbers')
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    feedback.push('Add special characters')
  }
  if (password.length >= 12 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
    feedback.push('Strong password!')
  }

  // Determine color and label
  let color = 'red'
  let label = 'Very Weak'
  
  switch (normalizedScore) {
    case 0:
      color = 'red'
      label = 'Very Weak'
      break
    case 1:
      color = 'orange'
      label = 'Weak'
      break
    case 2:
      color = 'yellow'
      label = 'Fair'
      break
    case 3:
      color = 'lime'
      label = 'Good'
      break
    case 4:
      color = 'green'
      label = 'Strong'
      break
  }

  return {
    score: normalizedScore,
    feedback: feedback.length > 0 ? feedback.join(', ') : label,
    percentage: (normalizedScore / 4) * 100,
    color,
  }
}
