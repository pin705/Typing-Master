export interface Article {
  id: string
  label: string
  content: string
  lang: 'en' | 'vi' | 'zh'
}

export const articles: Article[] = [
  // English Articles
  {
    id: 'match',
    label: 'The Little Match Girl (En)',
    content: 'The Little Match Girl was very cold. It was New Year\'s Eve, and the snow was falling. She walked the streets, bareheaded and barefoot.',
    lang: 'en',
  },
  {
    id: 'census',
    label: 'American Census (En)',
    content: 'The United States Census is a decennial census mandated by Article I, Section 2 of the United States Constitution.',
    lang: 'en',
  },
  {
    id: 'programming',
    label: 'Programming Quotes (En)',
    content: 'The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. Clean code always looks like it was written by someone who cares.',
    lang: 'en',
  },
  {
    id: 'artificial-intelligence',
    label: 'Artificial Intelligence (En)',
    content: 'Artificial intelligence is intelligence demonstrated by machines, as opposed to natural intelligence displayed by animals including humans. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of achieving its goals.',
    lang: 'en',
  },
  {
    id: 'climate-change',
    label: 'Climate Change (En)',
    content: 'Climate change refers to long-term shifts in temperatures and weather patterns. Such shifts can be natural, due to changes in the sun\'s activity or large volcanic eruptions. But since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels like coal, oil, and gas.',
    lang: 'en',
  },
  {
    id: 'space-exploration',
    label: 'Space Exploration (En)',
    content: 'Space exploration is the use of astronomy and space technology to explore outer space. While the exploration of space is currently carried out mainly by astronomers with telescopes, its physical exploration is conducted both by uncrewed robotic space probes and human spaceflight.',
    lang: 'en',
  },
  {
    id: 'renewable-energy',
    label: 'Renewable Energy (En)',
    content: 'Renewable energy is energy that is collected from renewable resources that are naturally replenished on a human timescale. It includes sources such as sunlight, wind, rain, tides, waves, and geothermal heat. Renewable energy stands in contrast to fossil fuels, which are being used far more quickly than they are being replenished.',
    lang: 'en',
  },
  {
    id: 'digital-marketing',
    label: 'Digital Marketing (En)',
    content: 'Digital marketing is the component of marketing that uses the Internet and online-based digital technologies such as desktop computers, mobile phones and other digital media and platforms to promote products and services. Its development during the 1990s and 2000s changed the way brands and businesses use technology for marketing.',
    lang: 'en',
  },
  {
    id: 'quantum-computing',
    label: 'Quantum Computing (En)',
    content: 'Quantum computing is a type of computation that harnesses the collective properties of quantum states, such as superposition, interference, and entanglement, to perform calculations. The devices that perform quantum computations are known as quantum computers.',
    lang: 'en',
  },
  {
    id: 'cyber-security',
    label: 'Cyber Security (En)',
    content: 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes.',
    lang: 'en',
  },

  // Vietnamese Articles
  {
    id: 'truyekieu',
    label: 'Truyện Kiều (Vi)',
    content: 'Trăm năm trong cõi người ta, Chữ tài chữ mệnh khéo là ghét nhau. Trải qua một cuộc bể dâu, Những điều trông thấy mà đau đớn lòng.',
    lang: 'vi',
  },
  {
    id: 'hcm',
    label: 'Tuyên ngôn độc lập (Vi)',
    content: 'Hỡi đồng bào cả nước, Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc.',
    lang: 'vi',
  },
  {
    id: 'congnghe-vi',
    label: 'Công nghệ thông tin (Vi)',
    content: 'Công nghệ thông tin là việc sử dụng máy tính để lưu trữ, truy xuất, truyền tải và xử lý dữ liệu hoặc thông tin. CNTT thường được sử dụng trong bối cảnh hoạt động kinh doanh, trái ngược với công nghệ được sử dụng cho mục đích cá nhân hoặc giải trí.',
    lang: 'vi',
  },
  {
    id: 'giaoduc-vi',
    label: 'Giáo dục Việt Nam (Vi)',
    content: 'Giáo dục là nền tảng phát triển của đất nước. Hệ thống giáo dục Việt Nam bao gồm giáo dục mầm non, phổ thông, trung học và đại học. Mỗi cấp học đều có vai trò quan trọng trong việc hình thành nhân cách và kiến thức cho thế hệ trẻ.',
    lang: 'vi',
  },
  {
    id: 'vanhoavietnam',
    label: 'Văn hóa Việt Nam (Vi)',
    content: 'Văn hóa Việt Nam có bề dày lịch sử hàng ngàn năm, chịu ảnh hưởng của văn hóa Trung Hoa nhưng vẫn giữ được bản sắc riêng. Tết Nguyên Đán là dịp lễ quan trọng nhất trong năm, thể hiện tinh thần đoàn kết và truyền thống gia đình.',
    lang: 'vi',
  },
  {
    id: 'kinhtevietnam',
    label: 'Kinh tế Việt Nam (Vi)',
    content: 'Kinh tế Việt Nam đã có những bước phát triển vượt bậc trong những thập kỷ gần đây. Từ một nền kinh tế nông nghiệp, Việt Nam đã chuyển mình thành một trong những nền kinh tế năng động nhất khu vực Đông Nam Á với tốc độ tăng trưởng ấn tượng.',
    lang: 'vi',
  },
  {
    id: 'moitruong-vi',
    label: 'Bảo vệ môi trường (Vi)',
    content: 'Bảo vệ môi trường là trách nhiệm của mỗi người dân. Chúng ta cần giảm thiểu rác thải nhựa, tiết kiệm năng lượng, và bảo vệ rừng xanh. Hành động nhỏ của mỗi người có thể tạo nên sự thay đổi lớn cho tương lai.',
    lang: 'vi',
  },
  {
    id: 'amnhacvietnam',
    label: 'Âm nhạc Việt Nam (Vi)',
    content: 'Âm nhạc Việt Nam đa dạng và phong phú, từ dân ca truyền thống đến nhạc hiện đại. Ca trù, quan họ, chèo là những loại hình nghệ thuật truyền thống được UNESCO công nhận. Nhạc pop Việt Nam cũng đang phát triển mạnh mẽ với nhiều tài năng trẻ.',
    lang: 'vi',
  },

  // Chinese Articles
  {
    id: 'chinese-culture',
    label: '中国文化 (Zh)',
    content: '中国文化源远流长，博大精深。从古代的四大发明到现代的科技创新，中华文明一直在不断发展。传统节日如春节、中秋节体现了深厚的文化底蕴和家庭观念。',
    lang: 'zh',
  },
  {
    id: 'chinese-technology',
    label: '科技发展 (Zh)',
    content: '科技是第一生产力，创新是引领发展的第一动力。人工智能、大数据、云计算等新技术正在深刻改变我们的生活方式。我们要抓住机遇，推动科技创新，建设科技强国。',
    lang: 'zh',
  },
  {
    id: 'chinese-education',
    label: '教育系统 (Zh)',
    content: '教育是国家发展的基石，是民族振兴的希望。中国实行九年义务教育制度，注重培养学生的综合素质。素质教育、创新教育成为新时代教育改革的重要方向。',
    lang: 'zh',
  },
  {
    id: 'chinese-environment',
    label: '环境保护 (Zh)',
    content: '保护环境就是保护生产力，改善环境就是发展生产力。我们要坚持绿色发展理念，建设美丽中国。节约资源、保护生态、防治污染是每个公民应尽的责任。',
    lang: 'zh',
  },
  {
    id: 'chinese-economy',
    label: '经济发展 (Zh)',
    content: '改革开放以来，中国经济取得了举世瞩目的成就。从计划经济向市场经济转型，从农业国家向工业化国家迈进。中国已经成为世界第二大经济体，对全球经济增长贡献巨大。',
    lang: 'zh',
  },
  {
    id: 'chinese-health',
    label: '健康生活 (Zh)',
    content: '健康是人生最宝贵的财富。合理膳食、适量运动、戒烟限酒、心理平衡是健康生活的四大基石。我们要养成良好的生活习惯，预防疾病，提高生活质量。',
    lang: 'zh',
  },
]
