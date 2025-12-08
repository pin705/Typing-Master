export interface Article {
  id: string
  label: string
  content: string
  lang: 'en' | 'vi'
}

export const articles: Article[] = [
  {
    id: 'match',
    label: 'The Little Match Girl (En)',
    content: "The Little Match Girl was very cold. It was New Year's Eve, and the snow was falling. She walked the streets, bareheaded and barefoot.",
    lang: 'en'
  },
  {
    id: 'census',
    label: 'American Census (En)',
    content: "The United States Census is a decennial census mandated by Article I, Section 2 of the United States Constitution.",
    lang: 'en'
  },
  {
    id: 'programming',
    label: 'Programming Quotes (En)',
    content: "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. Clean code always looks like it was written by someone who cares.",
    lang: 'en'
  },
  {
    id: 'truyekieu',
    label: 'Truyện Kiều (Vi)',
    content: "Trăm năm trong cõi người ta, Chữ tài chữ mệnh khéo là ghét nhau. Trải qua một cuộc bể dâu, Những điều trông thấy mà đau đớn lòng.",
    lang: 'vi'
  },
  {
    id: 'hcm',
    label: 'Tuyên ngôn độc lập (Vi)',
    content: "Hỡi đồng bào cả nước, Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc.",
    lang: 'vi'
  }
]
