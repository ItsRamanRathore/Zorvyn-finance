# Zorvyn Finance Dashboard — Enterprise Financial Intelligence 📊

Zorvyn is a professional-grade, high-performance finance management suite built with **Next.js 16**, **TypeScript**, and **Zustand**. It combines a sleek **Glassmorphism** aesthetic with enterprise-level features like Role-Based Access Control (RBAC), real-time data persistence, and intelligent subscription tracking.

---

## 🚀 Core Features

### 💎 Premium User Experience
- **Glassmorphism Design System**: A meticulously crafted UI using custom CSS Modules for maximum performance and a modern "frosted glass" aesthetic.
- **Adaptive Theme Engine**: Built-in support for high-contrast **Dark/Light Modes** that persist automatically across sessions.
- **Hardware-Accelerated Animations**: Powered by **Framer Motion** for butter-smooth transitions, modal interactions, and list state changes.
- **Skeleton loading Architecture**: Next-gen perceived performance using custom skeleton loaders to ensure a seamless "content-first" loading experience.

### 🔄 Smart Recurring Payments & Reminders (New)
- **Subscription Tracker**: Manage weekly and monthly recurring bills and subscriptions with a dedicated dashboard summary.
- **Notification Center**: Integrated reminder toggles for each recurring payment, providing real-time visual alerts in the ledger.
- **Next-Payment Intelligence**: Automatically calculates and displays the next due date for all active recurring tracking.

### 🔍 Advanced Transaction Ledger
- **High-Performance Filtering**: Instant, client-side filtering by category and transaction type (Income/Expense).
- **Multi-Vector Sorting**: Sort large datasets by Amount or Date with zero latency.
- **Intelligent Search**: Real-time fuzzy search across descriptions and categories.
- **Data Portability**: Professional **CSV Export** utility for external reporting and audit trails.

### 📊 Real-Time Analytics & Insights
- **Balance Trends**: Interactive Area Charts (Recharts) visualizing net worth progression over the last 30 days.
- **Categorical Spending Breakdown**: Dynamic Donut charts providing a visual hierarchy of expense distribution.
- **Automated Insights**: Data-driven observations that identify spending patterns and suggest budget optimizations.

### 🛡️ Enterprise Security & RBAC
- **Role-Based Access Control**: Fully simulated Admin vs. Viewer roles.
- **Dynamic UI Restriction**: The interface automatically hides/shows management actions relative to the user's current role permissions.

---

## 🛠️ Technical Excellence & Architecture

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) for superior routing and performance.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with persistence middleware, chosen for its lightweight footprint and high reactivity compared to Redux.
- **Data Visualization**: [Recharts](https://recharts.org/) for highly responsive and accessible financial data plotting.
- **Design Pattern**: **Vanilla CSS Modules** were intentionally chosen over utility frameworks like Tailwind to demonstrate custom design system architecture and high-fidelity CSS control.
- **State Persistence**: Custom-configured `localStorage` synchronization ensuring that all transactions, themes, and roles remain intact after page reloads.

---

## 🚀 Quick Start

### 1. Installation
```bash
git clone <repository-url>
cd zorvyn-finance
npm install
```

### 2. Development
```bash
npm run dev
```

---

## 🛡️ Judge's Evaluation Guide

To fully experience the technical depth of the application, please explore the following flows:

1. **Role Access Flow**: 
   - Toggle between **Admin** and **Viewer** in the top header.
   - Observe how the "Add Transaction" and "Delete" actions dynamically mount/unmount based on permission levels.
2. **Recurring Payment Flow**: 
   - Add a new transaction and toggle "Recurring Payment" on. 
   - Set a frequency and enable reminders.
   - Watch the transaction appear in the ledger with a <RotateCcw size={12} /> icon and see the **Recurring Payments** card on the dashboard update in real-time.
3. **Data Persistence**:
   - Add several transactions, change the theme to Light Mode, and refresh the browser.
   - Notice how **Zustand Persistence** restores the entire application state instantly.

---

*Built with precision for the Advanced Frontend Engineering Showcase.*
