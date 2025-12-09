import { User } from '~~/server/models/User'
import { Score } from '~~/server/models/Score'

// Achievement definitions
export const ACHIEVEMENTS = {
  // Speed achievements
  SPEED_DEMON: {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Reach 100 WPM',
    icon: '⚡',
    category: 'speed',
    tier: 'gold',
    points: 50,
    check: (stats: any) => stats.bestWpm >= 100,
  },
  FAST_FINGERS: {
    id: 'fast-fingers',
    name: 'Fast Fingers',
    description: 'Reach 80 WPM',
    icon: '🔥',
    category: 'speed',
    tier: 'silver',
    points: 30,
    check: (stats: any) => stats.bestWpm >= 80,
  },
  TYPING_NOVICE: {
    id: 'typing-novice',
    name: 'Typing Novice',
    description: 'Reach 60 WPM',
    icon: '🚀',
    category: 'speed',
    tier: 'bronze',
    points: 10,
    check: (stats: any) => stats.bestWpm >= 60,
  },

  // Accuracy achievements
  PERFECTIONIST: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Achieve 100% accuracy',
    icon: '🎯',
    category: 'accuracy',
    tier: 'platinum',
    points: 75,
    check: (stats: any) => stats.bestAccuracy >= 100,
  },
  SHARP_SHOOTER: {
    id: 'sharp-shooter',
    name: 'Sharp Shooter',
    description: 'Achieve 98% accuracy',
    icon: '🏹',
    category: 'accuracy',
    tier: 'gold',
    points: 40,
    check: (stats: any) => stats.bestAccuracy >= 98,
  },
  ACCURATE_TYPER: {
    id: 'accurate-typer',
    name: 'Accurate Typer',
    description: 'Achieve 95% accuracy',
    icon: '✨',
    category: 'accuracy',
    tier: 'silver',
    points: 20,
    check: (stats: any) => stats.bestAccuracy >= 95,
  },

  // Milestone achievements
  FIRST_STEPS: {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first typing test',
    icon: '🎉',
    category: 'milestones',
    tier: 'bronze',
    points: 5,
    check: (stats: any) => stats.totalTests >= 1,
  },
  DEDICATED_TYPER: {
    id: 'dedicated-typer',
    name: 'Dedicated Typer',
    description: 'Complete 10 typing tests',
    icon: '💪',
    category: 'milestones',
    tier: 'bronze',
    points: 15,
    check: (stats: any) => stats.totalTests >= 10,
  },
  TYPING_ENTHUSIAST: {
    id: 'typing-enthusiast',
    name: 'Typing Enthusiast',
    description: 'Complete 50 typing tests',
    icon: '🌟',
    category: 'milestones',
    tier: 'silver',
    points: 35,
    check: (stats: any) => stats.totalTests >= 50,
  },
  TYPING_MASTER: {
    id: 'typing-master',
    name: 'Typing Master',
    description: 'Complete 100 typing tests',
    icon: '👑',
    category: 'milestones',
    tier: 'gold',
    points: 60,
    check: (stats: any) => stats.totalTests >= 100,
  },

  // Consistency achievements
  CONSISTENT_PERFORMER: {
    id: 'consistent-performer',
    name: 'Consistent Performer',
    description: 'Maintain 90%+ average accuracy over 20 tests',
    icon: '📊',
    category: 'consistency',
    tier: 'gold',
    points: 45,
    check: (stats: any) => stats.totalTests >= 20 && stats.avgAccuracy >= 90,
  },
  STEADY_HANDS: {
    id: 'steady-hands',
    name: 'Steady Hands',
    description: 'Average 70+ WPM over 10 tests',
    icon: '🎪',
    category: 'consistency',
    tier: 'silver',
    points: 30,
    check: (stats: any) => stats.totalTests >= 10 && stats.avgWpm >= 70,
  },

  // Special achievements
  EARLY_ADOPTER: {
    id: 'early-adopter',
    name: 'Early Adopter',
    description: 'Join Typing Master in its early days',
    icon: '🌱',
    category: 'special',
    tier: 'gold',
    points: 25,
    check: () => true, // Awarded manually or based on join date
  },
}

/**
 * Calculate user statistics from their scores
 */
export async function calculateUserStats(userId: string) {
  const scores = await Score.find({ user: userId }).sort({ date: -1 })

  if (scores.length === 0) {
    return {
      totalTests: 0,
      avgWpm: 0,
      bestWpm: 0,
      avgAccuracy: 0,
      bestAccuracy: 0,
    }
  }

  const totalTests = scores.length
  const avgWpm = Math.round(scores.reduce((sum, s) => sum + s.wpm, 0) / totalTests)
  const bestWpm = Math.max(...scores.map(s => s.wpm))
  const avgAccuracy = Math.round(scores.reduce((sum, s) => sum + s.accuracy, 0) / totalTests)
  const bestAccuracy = Math.max(...scores.map(s => s.accuracy))

  return {
    totalTests,
    avgWpm,
    bestWpm,
    avgAccuracy,
    bestAccuracy,
  }
}

/**
 * Check and award achievements to a user
 */
export async function checkAndAwardAchievements(userId: string) {
  const user = await User.findById(userId)
  if (!user)
    return []

  const stats = await calculateUserStats(userId)
  const newAchievements: string[] = []

  // Check each achievement
  for (const achievement of Object.values(ACHIEVEMENTS)) {
    // Skip if user already has this achievement
    if (user.achievements.includes(achievement.id))
      continue

    // Check if criteria is met
    if (achievement.check(stats)) {
      user.achievements.push(achievement.id)
      newAchievements.push(achievement.id)

      // Award experience points
      user.experience = (user.experience || 0) + achievement.points
    }
  }

  // Calculate level based on experience (100 XP per level)
  user.level = Math.floor((user.experience || 0) / 100) + 1

  if (newAchievements.length > 0) {
    await user.save()
  }

  return newAchievements.map(id =>
    Object.values(ACHIEVEMENTS).find(a => a.id === id),
  )
}

/**
 * Get achievement details by ID
 */
export function getAchievement(id: string) {
  return Object.values(ACHIEVEMENTS).find(a => a.id === id)
}

/**
 * Get all achievements
 */
export function getAllAchievements() {
  return Object.values(ACHIEVEMENTS)
}

/**
 * Get user's earned achievements
 */
export function getUserAchievements(achievementIds: string[]) {
  return achievementIds
    .map(id => getAchievement(id))
    .filter(Boolean)
}
