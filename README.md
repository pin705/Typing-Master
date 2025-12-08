# Typing Master Clone

A modern, feature-rich typing practice application built with **Nuxt 3** and **Tailwind CSS**, inspired by `dazi.kukuw.cn`.

![Typing Master Preview](https://placehold.co/600x400?text=Typing+Master+Preview)

## Features

- **Real-time Statistics**: Track your Words Per Minute (WPM), Accuracy, and Time Remaining as you type.
- **Virtual Keyboard**: Visual feedback for the active key and your key presses.
- **Multiple Articles**: Choose from preset articles or try a random one.
- **Customizable Settings**:
    - 🌙 **Night Mode**: Easy on the eyes for late-night practice.
    - 🔍 **Large Font**: Improved readability.
    - 🛤️ **Show Trace**: Highlight your typing progress.
- **Detailed Results**: Comprehensive summary of your performance after each session.

## Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Nuxt UI / Heroicons](https://ui.nuxt.com/)
- **State Management**: Vue Composition API (Refs & Composables)

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kukuw
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
kukuw/
├── app/
│   ├── components/      # Vue components (TypingArea, VirtualKeyboard, etc.)
│   ├── composables/     # Shared logic (useTyping.ts)
│   ├── pages/           # Application routes
│   └── app.vue          # Root component
├── nuxt.config.ts       # Nuxt configuration
└── tailwind.config.ts   # Tailwind configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
