# Zorvyn Finance Dashboard 📊

Zorvyn is a professional, high-performance finance management dashboard built with **Next.js 16**, **TypeScript**, and **Framer Motion**. It provides users with deep insights into their spending habits, income trends, and budget management with a sleek, premium **Glassmorphism** interface.

## ✨ Key Features

### 1. Unified Dashboard
- **Financial Summary**: Real-time cards for Total Balance, Monthly Income, Expenses, and Savings Rate.
- **Balance Trend**: Interactive Area Chart (Recharts) visualizing financial growth over the last 30 days.
- **Spending Breakdown**: Categorical analysis using Donut charts to identify top expense areas.
- **Data-Driven Insights**: Automated observations on spending patterns and growth projections.

### 2. Advanced Transaction Management
- **Interactive Ledger**: A high-performance table with instant searching, categorical filtering, and multi-column sorting.
- **Management Suite**: Admin-level users can add and delete transactions with full form validation and submission feedback.
- **Data Portability**: Functional **CSV Export** utility to download your financial logs for external use.

### 3. Smart Budgeting & Settings
- **Budget Manager**: Visual progress bars tracking monthly spending limits per category with "Over-Budget" alerts.
- **Theme Engine**: Seamless **Dark/Light Mode** switching that persists across sessions.
- **Profile Hub**: Comprehensive settings for user profile management and security preferences.

### 4. Enterprise-Grade User Experience
- **RBAC (Role-Based Access Control)**: Simulated Admin vs. Viewer roles, dynamically restricting UI actions based on permissions.
- **Superior Performance**: Perceived performance optimized with **Skeleton Loaders** and hardware-accelerated animations.
- **State Persistence**: Full state synchronization with `LocalStorage` using Zustand for a modern SPA feel.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with Persistence Middleware)
- **Visuals & Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla **CSS Modules** (for zero-runtime overhead and complete design control)
- **Date Handling**: [date-fns](https://date-fns.org/)

### Why this stack?
- **Next.js** was chosen for its best-in-class server components and Vercel-native optimizations.
- **Zustand** provides a significantly lighter and faster state management experience compared to Redux, perfect for reactive dashboards.
- **CSS Modules** were used instead of Tailwind to demonstrate a deep understanding of core CSS architecture, modularity, and custom design systems.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd zorvyn-finance
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

## 🛡️ RBAC Simulation (Judges Guide)

To demonstrate the **Role-Based UI**, use the switcher located in the top-right header:
- **Admin**: Full access. You can see the "Add Transaction" button and the delete icons in the transaction table.
- **Viewer**: Read-only access. Management actions are automatically hidden from the UI to prevent unauthorized data mutation.

---

*Built with ❤️ for the Frontend Development Assignment.*
