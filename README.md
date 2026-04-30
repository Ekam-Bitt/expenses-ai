# AutoSplit AI

> No manual entries. No awkward reminders. Just done.

**AutoSplit AI** is an intelligent group expense manager that eliminates manual expense tracking by detecting transactions, structuring them using AI, and managing group settlements intelligently.

## ✨ Features

- **AI-Powered Categorization** — Automatically categorizes expenses using Gemini 2.5 Flash
- **Receipt Scanning** — Upload a receipt photo and AI extracts amount, date, category, and title
- **Smart Expense Splitting** — Split expenses evenly or unevenly among group members
- **Debt Simplification** — Graph-based optimization to minimize the number of settlement transactions
- **Group Management** — Create groups for trips, outings, or shared living expenses
- **Real-time Balances** — See who owes whom at a glance
- **Multi-currency Support** — Default INR with support for other currencies
- **Progressive Web App** — Install on mobile for a native app-like experience
- **Export Data** — Export expenses as CSV or JSON

## 🏗️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [Prisma](https://prisma.io/) ORM + PostgreSQL
- **AI Engine**: Google Gemini 2.5 Flash (via OpenAI-compatible API)
- **Storage**: AWS S3 for receipt images
- **Deployment**: Vercel / Docker

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (or Docker)
- Google Gemini API Key ([Get one here](https://aistudio.google.com/apikey))

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Ekam-Bitt/expenses-ai.git
   cd expenses-ai
   ```

2. Start a PostgreSQL database
   ```bash
   ./scripts/start-local-db.sh
   ```

3. Configure environment
   ```bash
   cp .env.example .env
   # Edit .env with your database URL, Gemini API key, and S3 credentials
   ```

4. Install dependencies
   ```bash
   npm install
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## 🤖 AI Features

### Auto-Categorization
When creating an expense, the AI automatically suggests the most relevant category based on the title. Powered by Gemini 2.5 Flash.

### Receipt Scanning
Upload a photo of any receipt and the AI will extract:
- **Amount** (total)
- **Category** (Food, Travel, Entertainment, etc.)
- **Date**
- **Title** (merchant name)

### Environment Variables for AI

```env
NEXT_PUBLIC_ENABLE_CATEGORY_EXTRACT=true
NEXT_PUBLIC_ENABLE_RECEIPT_EXTRACT=true
GEMINI_API_KEY=your-gemini-api-key
```

## 📦 Docker

```bash
npm run build-image
cp container.env.example container.env
npm run start-container
```

## 📄 License

MIT
