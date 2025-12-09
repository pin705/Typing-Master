# Typing Master

A modern, feature-rich typing practice application built with **Nuxt 3** and **Tailwind CSS**, inspired by `dazi.kukuw.cn`.

![Typing Master Preview](https://placehold.co/600x400?text=Typing+Master+Preview)

## Features

### Core Features
- **Real-time Statistics**: Track your Words Per Minute (WPM), Accuracy, and Time Remaining as you type.
- **Virtual Keyboard**: Visual feedback for the active key and your key presses.
- **Multiple Articles**: Choose from preset articles or try a random one.
- **Customizable Settings**:
    - 🌙 **Night Mode**: Easy on the eyes for late-night practice.
    - 🔍 **Large Font**: Improved readability.
    - 🛤️ **Show Trace**: Highlight your typing progress.
- **Detailed Results**: Comprehensive summary of your performance after each session.

### Phase 1 Features (✅ COMPLETED)
- **User Authentication**: 
  - ✅ Register and login with email/password
  - ✅ Secure session management
  - ✅ Password validation and hashing
  - ✅ Logout functionality
- **User Profiles**: 
  - ✅ Personal statistics dashboard
  - ✅ Historical performance tracking (last 10 tests)
  - ✅ Profile editing (username, bio)
  - ✅ Avatar initials display
- **Enhanced Leaderboard**: 
  - ✅ Compete with other users
  - ✅ Track your global ranking
  - ✅ Highlight your personal scores
- **Multi-language Support**: 
  - ✅ English, Vietnamese, and Chinese interfaces
  - ✅ Language-specific typing content

### Phase 1.5 Features (✅ COMPLETED)
- **OAuth Integration**:
  - ✅ Google OAuth 2.0 authentication
  - ✅ GitHub OAuth authentication
  - ✅ Automatic account linking
  - ✅ Pre-verified OAuth users
- **Password Management**:
  - ✅ Forgot password functionality
  - ✅ Password reset via email
  - ✅ Secure token-based reset system
- **Email Verification**:
  - ✅ Email verification on registration
  - ✅ Resend verification email
  - ✅ Token-based verification system
- **Email Service**:
  - ✅ Professional HTML email templates
  - ✅ NodeMailer integration
  - ✅ SMTP configuration support

## Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [nuxt-mongoose](https://nuxt-mongoose.behonbaker.com/)
- **Authentication**: [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils)
- **Icons**: [Heroicons](https://heroicons.com/)
- **State Management**: Vue Composition API (Refs & Composables)
- **PWA**: Progressive Web App support

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm, pnpm, or yarn
- MongoDB (optional - the app can run without it, but authentication features will not work)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Typing-Master
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `MONGODB_URI`: Your MongoDB connection string (optional, but required for auth)
   - `NUXT_SESSION_PASSWORD`: A secure random string for session encryption (required for auth)
   - `NUXT_PUBLIC_SITE_URL`: Your application URL (default: http://localhost:3000)
   - OAuth credentials (optional):
     - `NUXT_OAUTH_GOOGLE_CLIENT_ID` and `NUXT_OAUTH_GOOGLE_CLIENT_SECRET`
     - `NUXT_OAUTH_GITHUB_CLIENT_ID` and `NUXT_OAUTH_GITHUB_CLIENT_SECRET`
   - Email service configuration (optional, for password reset and verification):
     - `NUXT_SMTP_HOST`: Your SMTP server (default: smtp.gmail.com)
     - `NUXT_SMTP_PORT`: SMTP port (default: 587)
     - `NUXT_SMTP_USER`: Your email address
     - `NUXT_SMTP_PASS`: Your email password or app-specific password

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### MongoDB Setup (Optional)

To use authentication and user profiles:

1. Install MongoDB locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
2. Add your MongoDB connection string to `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/typing-master
   # or for MongoDB Atlas:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/typing-master
   ```

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
Typing-Master/
├── app/
│   ├── components/      # Vue components (TypingArea, VirtualKeyboard, AuthModal, etc.)
│   ├── composables/     # Shared logic (useTyping.ts, useAuth.ts)
│   ├── pages/           # Application routes
│   ├── data/            # Static data (articles, words)
│   └── app.vue          # Root component
├── server/
│   ├── api/             # API endpoints
│   │   ├── auth/        # Authentication endpoints
│   │   ├── profile/     # Profile management
│   │   └── scores/      # Score tracking
│   ├── models/          # Database models (User, Score)
│   └── utils/           # Server utilities
├── i18n/                # Internationalization
│   └── locales/         # Translation files
├── nuxt.config.ts       # Nuxt configuration
└── .env.example         # Environment variables template
```

## Development Roadmap

See [ROADMAP.md](ROADMAP.md) for the complete development roadmap and planned features.

### Current Phase Status
- ✅ **Phase 1 (Q1 2026)**: User Authentication & Profiles - **COMPLETED**
- 🔄 **Phase 1.5 (Q1 2026)**: OAuth, Password Reset, Email Verification - **IN PROGRESS**
- 📋 **Phase 2 (Q2 2026)**: Enhanced Typing Experience - **PLANNED**
- 📋 **Phase 3 (Q3 2026)**: Social Features - **PLANNED**
- 📋 **Phase 4 (Q4 2026)**: Personalization & AI - **PLANNED**
- 📋 **Phase 5 (Q1 2027)**: Mobile & Accessibility - **PLANNED**
- 📋 **Phase 6 (Q2 2027)**: Enterprise & Education - **PLANNED**

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
