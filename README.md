# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is# Woodharbour India Pvt. Ltd. eCommerce Website

A premium, production-ready wood furniture and interior design eCommerce website built with React (Vite) and Firebase.

## 🚀 Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Environment Variables:**
    Create a `.env` file in the root and add your Firebase credentials:
    ```env
    VITE_FIREBASE_API_KEY=your_key
    VITE_FIREBASE_AUTH_DOMAIN=your_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```
3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 🛠️ Automated Product Generation

To automatically generate product data from your images:
1.  Create a folder `public/products`.
2.  Add subfolders for each category (`furniture`, `home-decor`, etc.).
3.  Place your product images inside these category folders.
4.  Run the generation script:
    ```bash
    node scripts/generate_products.js
    ```
    This will create `src/data/products_automated.js` with your categories and products.

## 📅 Key Features

- **Premium UI:** Glassmorphism, scroll animations, and parallax effects.
- **Shop:** Advanced filtering, search, and sorting.
- **Cart & Wishlist:** Fully functional local persistence.
- **Admin Panel:** CRUD for products and order tracking.
- **WhatsApp Support:** Floating contact button.
- **SEO Optimized:** Dynamic meta tags and titles.

---
Built with ❤️ by Woodharbour India Team.
](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
