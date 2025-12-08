import { commonWords } from '~/utils/words'

export const useWordGenerator = () => {
  const generateWords = (
    count: number,
    lang: 'en' | 'vi' | 'zh' = 'en',
    options: { punctuation?: boolean, numbers?: boolean } = {},
  ) => {
    const words = commonWords[lang] || commonWords.en
    const result: string[] = []

    for (let i = 0; i < count; i++) {
      let word = words[Math.floor(Math.random() * words.length)]

      // Add numbers occasionally
      if (options.numbers && Math.random() < 0.1) {
        word = Math.floor(Math.random() * 1000).toString()
      }

      // Add punctuation occasionally
      if (options.punctuation && Math.random() < 0.2) {
        const marks = ['.', ',', '!', '?', ';', ':']
        const mark = marks[Math.floor(Math.random() * marks.length)]
        word += mark
      }

      // Capitalize occasionally
      if (Math.random() < 0.1) {
        word = word.charAt(0).toUpperCase() + word.slice(1)
      }

      result.push(word)
    }

    return result.join(' ')
  }

  return {
    generateWords,
  }
}
