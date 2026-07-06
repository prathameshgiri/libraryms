<div align="center">
  <img src="https://raw.githubusercontent.com/framer/motion/main/packages/framer-motion/README/framer-motion.svg" alt="Library MS Logo" width="100" />
  
  # 📚 Enterprise Library Management System

  **A modern, scalable, and premium open-source Library Management System built with React, Vite, and Tailwind CSS.**
  <br />
  
  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#%EF%B8%8F-installation">Installation</a> •
    <a href="#-developer">Developer</a>
  </p>
  
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  ![Open Source](https://img.shields.io/badge/Open_Source-%2343A047.svg?style=for-the-badge&logo=open-source-initiative&logoColor=white)
  
</div>

---

## 📖 Description

The **Enterprise Library Management System** is a next-generation platform designed to handle all modern library operations smoothly. With an absolute focus on **Premium UI/UX** utilizing glassmorphism, smooth micro-animations, and dynamic visual feedbacks, this open-source project replaces outdated legacy software with a beautiful and highly interactive experience.

It features complete **Role-Based Access Control (RBAC)** providing specialized dashboards for Super Admins, Librarian Operators, and General Users.

---

## ✨ Features & Scope

### 👑 Role-Based Access Control
- **Super Admin**: Full unrestricted access to the entire platform, staff management, and system settings.
- **Librarian Operator**: Complete control over day-to-day operations (Issuing, Returns, Fine collection, Book entries).
- **General User**: Personalized dashboard to track currently borrowed books, reading history, and upcoming due dates.

### 📚 Core Modules
| Module | Description |
|--------|-------------|
| **Catalog Management** | Complete CRUD operations for Books, Categories, Authors (Indian dataset), and Publishers. |
| **Circulation** | Seamless **Issue & Return** workflow with integrated Fine Management and receipt generation. |
| **Member Management** | Member tracking, active/inactive statuses, and detailed borrowing history per member. |
| **Reservations** | Allow members to reserve books and track availability status. |
| **Barcode & QR Generation** | Built-in tool to automatically generate, preview, and print book barcodes and ISBN QR codes. |
| **Analytics & Reports** | Recharts-powered interactive dashboard charts (Monthly Issues, Fine Collections, Category Distributions). |

### 🎨 Premium UI / UX
- **Glassmorphism Design**: Soft frosted-glass overlays, dynamic gradient backgrounds, and beautiful soft shadows.
- **Framer Motion Animations**: Page transitions, staggered list appearances, and hover micro-interactions.
- **Dark Mode**: Fully implemented contextual dark mode across the entire application.

---

## 🛠️ Tech Stack & Skills

This project leverages a modern front-end ecosystem to deliver enterprise-grade performance:

- **Core**: React 18 (Functional Components, Hooks, Context API)
- **Build Tool**: Vite (Lightning-fast HMR and optimized builds)
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v3 (Custom Utility Classes + Glassmorphism)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form + Zod Schema Validation
- **Charts**: Recharts
- **Utilities**: `date-fns` (Date formatting), `react-toastify` (Alerts), `react-barcode` / `react-qr-code`

---

## ⚙️ Installation

Follow these steps to run this project locally on your machine.

**1. Clone the Repository**
```bash
git clone https://github.com/prathameshgiri/library-ms.git
cd library-ms
```

**2. Install Dependencies**
```bash
npm install
# or
yarn install
```

**3. Start the Development Server**
```bash
npm run dev
# or
yarn dev
```

**4. Open in Browser**
Navigate to `http://localhost:5173` in your favorite browser. You will be greeted with the Login screen. You can use the quick-login demo cards to enter the platform.

---

## 💡 Important Points to Note

> ⚠️ **Data Persistence Note:** This project currently runs entirely on the Front-End. It uses a robust set of initial `mockData` coupled with React Context and `localStorage` to simulate backend operations. To deploy this to production, you will need to replace the Context/Mock API calls with actual REST or GraphQL backend endpoints.

- **Indian Context:** The default mocked data (Authors, Publishers, Currencies in ₹) is specifically tailored to the Indian context but can be customized easily via `src/data/mockData.js`.
- **Custom Theming:** The color palette and gradients are defined globally in `tailwind.config.js`.

---

## 👨‍💻 Developed By

**Prathamesh Giri**

This project is fully **Open Source** and built for the community. Feel free to fork, modify, and use it in your portfolios or real-world use cases. Contributions, issues, and feature requests are always welcome!

<div align="center">
  <br />
  <p>Made with ❤️ and React</p>
</div>
