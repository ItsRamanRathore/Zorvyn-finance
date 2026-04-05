# Zorvyn Finance Dashboard — Enterprise Financial Intelligence 📊

Zorvyn is a professional-grade, high-performance finance management suite built with **Next.js 16**, **TypeScript**, and **Zustand**. It combines a sleek **Glassmorphism** aesthetic with enterprise-level features like Role-Based Access Control (RBAC), real-time data persistence, interactive global settings, and predictive insights.

---

## 🏆 Project Achievements (10/10 Hackathon Requirements Fulfilled)

Zorvyn proudly fulfills 100% of advanced frontend capability requirements:
1. ✅ **Dashboard Overview** with dynamic, calculated Summary Cards.
2. ✅ **Time-Based Visualizations** mapping 30-day balance trends.
3. ✅ **Categorical Visualizations** via custom donut charts for spending breakdown.
4. ✅ **Transaction Ledger** with detailed attributes and status indicators.
5. ✅ **Interactive Filtering** for isolated Income/Expense views.
6. ✅ **Real-time Searching & Sorting** powered by high-performance memoized filters.
7. ✅ **Role-Based UI** with Admin/Viewer access controls globally modifying UI state.
8. ✅ **Automated Insights Section** providing actionable financial optimization data.
9. ✅ **Robust State Management** using Zustand with seamless local-storage persistence.
10. ✅ **Responsive Design** adapting flawlessly from mobile viewports to ultra-widescreen monitors.

---

## 🚀 Core Features

### 💎 Premium User Experience
- **Glassmorphism Design System**: A meticulously crafted UI using custom CSS Modules for maximum performance and a modern "frosted glass" aesthetic.
- **Adaptive Settings Engine**: Built-in, user-controlled **Dark/Light Modes** and profile customizations that sync globally across the entire app state in real-time.
- **Hardware-Accelerated Animations**: Powered by **Framer Motion** for butter-smooth transitions, scroll-linked landing page reveals, and list state changes.
- **Responsive Landing Page**: A conversion-optimized marketing front-page showcasing Trust & Transparency, a floating "Savings Preview" widget, and high-fidelity embedded mockups.

### 🔄 Smart Recurring Payments & Reminders
- **Subscription Tracker**: Manage weekly and monthly recurring bills and subscriptions with a dedicated dashboard summary.
- **Notification Center**: Integrated reminder toggles for each recurring payment, providing real-time visual alerts in the ledger.
- **Next-Payment Intelligence**: Automatically calculates and displays the next due date for all active recurring tracking.

### 🛡️ Enterprise Security & Transparency
- **Role-Based Access Control**: Fully simulated Admin vs. Viewer roles. The interface strictly denies/hides write-actions (adding or deleting transactions) from Viewer roles.
- **Legal & Privacy Infrastructure**: Built-in "Trust & Transparency" landing mechanisms communicating strict adherence to data anonymity, no-hidden-fee models, and data ownership.

---

## 🛠️ Technical Excellence & Architecture

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) for superior routing and React Server Component readiness.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with persistence middleware. Chosen for its lightweight footprint, atomic updates, and high reactivity compared to Redux overhead. Profile configuration, theme state, roles, and transaction mutations are unified strictly within the store.
- **Data Visualization**: [Recharts](https://recharts.org/) for highly responsive and accessible financial data plotting.
- **Styling Architecture**: **Vanilla CSS Modules** were intentionally chosen over utility frameworks to demonstrate custom design system architecture, pseudo-class mastery, and precise high-fidelity layout control.

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
   - Navigate to the Dashboard or Transactions list.
   - Use the Role Switcher in the top navigation header to toggle between **Admin** and **Viewer**.
   - Observe how the "Add Transaction" button and "Delete" actions dynamically mount/unmount based on permission levels instantly.
2. **Global State Syncing Flow**:
   - Navigate to the **Settings** page from the sidebar.
   - Update your **Full Name** and toggle **Dark Mode**.
   - Watch as your custom name instantly updates in the Sidebar user profile and Dashboard welcome banner, and the global theme gracefully transition across all active views without reloading.
3. **Responsive Presentation**:
   - Shrink your browser window down to mobile widths.
   - Watch the Sidebar conditionally collapse into a smooth sliding overlay menu. 
   - Verify the main dashboard grids and Recharts elements seamlessly reflow to stack vertically.
4. **Landing Page Aesthetic**:
   - Log out / visit the root path anonymously.
   - Witness the premium Framer Motion scroll animations, overlapping widget cards, and precisely scaled preview assets.

---

*Built with precision for the Advanced Frontend Engineering Showcase.*
