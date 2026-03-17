# 🌍 Travel Explorer

A modern React application for exploring countries, saving favorites, and planning trips.

---

## 🚀 Live Demo

👉 https://travel-explorer-ashy.vercel.app/

---

## 🚀 Features

* 🌐 Browse countries using REST Countries API
* 🔍 Search countries with debounce
* 🎯 Filter by region and population
* 📄 View detailed country information
* ⭐ Add/remove favorites (saved in localStorage)
* ✈️ Create, edit, and delete trips
* 💾 Data persistence with localStorage
* 📱 Fully responsive (mobile, tablet, desktop)
* ✨ Smooth UI animations

---

## 🛠 Tech Stack

* React (Hooks)
* TypeScript
* React Router
* Vite
* CSS (Responsive Design)
* localStorage

---

## 🧠 Architecture

```
src/
  components/   → reusable UI (CountryCard, Header, etc.)
  pages/        → page components (Explore, Favorites, Trips)
  services/     → API logic (countriesApi)
  hooks/        → custom hooks (useDebounce)
  utils/        → helper functions (formatPopulation)
  types/        → TypeScript types
```

---

## 🔄 Data Flow

User action → State update → UI re-render → localStorage sync

Examples:

* ⭐ Add to favorites → saved in state → persisted in localStorage
* ✈️ Create trip → added to state → displayed in Trips page

---

## 📦 Installation

```bash
npm install
npm run dev
```

---

## 🧩 Key Concepts Practiced

* State management (useState, lifting state)
* Side effects (useEffect)
* Custom hooks
* Reusable components
* Data transformation
* CRUD operations
* Persistence (localStorage)
* Responsive UI

---

## 📌 Future Improvements

* 🌙 Dark mode
* 🌍 Country dropdown for trips
* 🔐 Backend integration
* 🎨 Advanced UI/UX polish

---

## 👨‍💻 Author

**Kanatbek Abad**
