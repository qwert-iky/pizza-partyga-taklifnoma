# 🍕 Pizza Party Taklifnoma Sayti

She'rozbek "Sensey" Baxtiyorov tomonidan uyushtiriladigan **Pizza Party** uchun to'liq fullstack veb-ilova.

---

## 🏗️ Loyiha Strukturasi

```
taklifnoma sayt/
├── backend/        → Node.js + Express + MongoDB API
└── frontend/       → Vite + TailwindCSS + Vanilla JS
```

---

## ⚙️ Texnologiyalar

| Qism     | Texnologiyalar                                              |
|----------|-------------------------------------------------------------|
| Frontend | Vite, Vanilla JS (ES Modules), TailwindCSS CDN, Axios CDN  |
| Backend  | Node.js, Express.js, MongoDB, Mongoose                     |
| Auth     | JWT (jsonwebtoken), bcryptjs                               |
| Boshqa   | cors, dotenv                                               |

---

## 🚀 Ishga Tushirish

### 1. MongoDB

MongoDB o'rnatilgan va ishlab turishi kerak:
```bash
mongod
```
Yoki [MongoDB Atlas](https://cloud.mongodb.com) cloud ulanishdan foydalaning.

---

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

Server `http://localhost:5000` da ishga tushadi.

`.env` fayl:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pizza-party
JWT_SECRET=pizza_party_secret_key_2024
```

---

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Sayt `http://localhost:5173` da ochiladi.

> **Eslatma:** Agar Vite o'rnatilmagan bo'lsa, oddiy `index.html` ni to'g'ridan-to'g'ri brauzerda ochib bo'lmaydi (ES Modules CORS cheklovlari sababli). `npm run dev` ishlatish tavsiya etiladi.

---

## 🌐 API Endpoints

### Auth
| Method | URL                  | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/auth/register` | Admin ro'yxatdan o'tish  |
| POST   | `/api/auth/login`    | Admin login → JWT token  |
| GET    | `/api/auth/me`       | Joriy user info (auth)   |

### Mehmonlar (Guests)
| Method | URL               | Access | Description               |
|--------|-------------------|--------|---------------------------|
| GET    | `/api/guests`     | Public | Barcha mehmonlar ro'yxati |
| POST   | `/api/guests`     | Public | Taklifnomani qabul qilish |
| DELETE | `/api/guests/:id` | Auth   | Mehmonni o'chirish        |

### Kino Ovoz (Votes)
| Method | URL                | Access | Description               |
|--------|--------------------|--------|---------------------------|
| GET    | `/api/votes`       | Public | Barcha ovozlar             |
| POST   | `/api/votes`       | Public | Ovoz berish (1 kishi 1 marta) |
| GET    | `/api/votes/stats` | Public | Statistika (foiz bilan)   |

---

## ✨ Sayt Xususiyatlari

- 🌙 **Dark Mode** — localStorage bilan saqlanadi
- 🎉 **Confetti** — Sahifa ochilganda avtomatik
- 🍕 **Floating Pizzas** — Hero sectionda suzib yuruvchi emoji
- ⏳ **Countdown Timer** — Tadbir sanasiga qadar jonli hisoblagich
- 👥 **RSVP ro'yxati** — Real-time yangilanadi (30 soniyada bir)
- 🗳️ **Kino so'rovi** — Progress bar animatsiya bilan
- 📱 **Responsive** — Mobil va desktop uchun
- 🎨 **Hover/Active animatsiyalar** — Barcha kartochka va tugmalar

---

## 🎬 Kinolar

| Kino            | Emoji |
|-----------------|-------|
| Boshpana        | 🏠    |
| Odisseya        | 🌊    |
| Interstellar    | 🚀    |
| The Dark Knight | 🦇    |

---

## 👨‍🍳 Organizer

**She'rozbek Baxtiyorov** — *"Sensey"*  
🏆 Pizza Party Master · 🎬 Kino Eksperti · 🍕 Chief Pizza Officer

---

## 📅 Tadbir Ma'lumotlari

| Maydon | Ma'lumot           |
|--------|--------------------|
| Sana   | 25-noyabr, 2024    |
| Kun    | Shanba             |
| Vaqt   | Kechki 18:00       |
| Joy    | Sensey uyi         |
| Narx   | 50,000 so'm (naqd) |
