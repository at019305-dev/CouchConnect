# 🛋️ CouchConnect

A full-stack CouchSurfing-style web application where travelers can find local hosts, send stay requests, chat, and build a community — all in one place.

Built with **Angular 17+**, **Node.js / Express / TypeScript**, and **MongoDB Atlas**.

---

## ✨ Features

### 👤 Authentication & Roles
- JWT-based auth with HTTP-only cookies + Bearer token support
- Three roles: **Traveler**, **Local**, **Admin**
- Blacklist / suspend accounts via admin panel
- Last seen tracking per user

### 🗺️ Interactive Map
- Leaflet map with CARTO Voyager tiles
- Find locals pinned on the map by city
- Nominatim geocoding for city-to-coordinates lookup
- Click a pin to view profile and send a stay request

### 🏠 Stay Requests
- Travelers browse locals and send stay requests with date range, message, guest count and purpose
- Locals accept or reject requests
- Notifications sent on every status change
- Direct **Chat** button unlocked after acceptance

### 💬 Real-time Style Chat
- Persistent chat between any two users
- Inbox with unread message counts
- Mark messages as seen
- Smooth polling-based updates

### 🙋 Community Q&A
- Post questions with city tags
- Answer other users' questions
- Admin can delete any question or answer

### 🛡️ Identity Verification
- Upload a government ID image (base64)
- OCR text extraction via **Tesseract.js**
- Dice coefficient similarity matching against submitted name
- Admin reviews and approves / rejects verifications
- Verified badge shown on profile

### 🌟 Ratings & Reviews
- Rate a local after a completed stay
- Automatic average rating calculation on profile
- App-wide star rating system

### 📸 Profile & Posts
- Edit profile: bio, city, languages, photo, cover photo, social links, emergency contact
- Upload photos to profile feed
- Like and comment on posts
- Notifications for likes and comments

### 🔔 Notifications
- In-app notifications for: stay requests, acceptance/rejection, messages, likes, comments, verifications
- Mark all read / mark individual read

### 🛠️ Admin Dashboard
- Overview stats: total users, locals, stays, verified accounts
- User management: view, approve, reject, blacklist, delete, change role
- Bulk actions on multiple users
- Verification queue with OCR confidence scores
- Reports management
- Activity feed (recent signups, stays, verifications)
- Q&A moderation

### 🎨 UI / UX
- Dark / Light mode (persisted via ThemeService)
- Skeleton loaders on all data-heavy pages
- Glassmorphism auth cards
- Animated hero slideshow on landing page
- Fully responsive design
- Back button component across all pages

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 17+, TypeScript, RxJS |
| Styling | Custom CSS, Glassmorphism, CSS Variables |
| Map | Leaflet.js + MapLibre GL, CARTO tiles |
| Backend | Node.js, Express 5, TypeScript |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT (jsonwebtoken), bcryptjs |
| OCR | Tesseract.js |
| Dev Tools | ts-node, nodemon, Angular CLI |

---

## 📁 Project Structure

```
CouchConnect/
├── backend/
│   ├── src/
│   │   ├── config/         # MongoDB connection
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth & role guards
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routers
│   │   └── server.ts       # App entry point
│   ├── .env
│   └── package.json
│
└── client/
    └── src/
        └── app/
            ├── core/
            │   └── services/   # Auth, Chat, Stay, Profile...
            ├── Pages/          # All route components
            │   ├── admin/
            │   ├── home/
            │   ├── landing/
            │   ├── locals/
            │   ├── map/
            │   ├── messages/
            │   ├── profile/
            │   ├── questions/
            │   ├── traveler/
            │   └── verification/
            └── shared/         # Navbar, back button, etc.
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- Angular CLI: `npm install -g @angular/cli`

### 1. Clone the repo
```bash
git clone https://github.com/at019305-dev/CouchConnect.git
cd CouchConnect
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/couchconnect
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```
Backend runs at → `http://localhost:3000`

### 3. Setup Frontend
```bash
cd client
npm install
ng serve
```
Frontend runs at → `http://localhost:4200`

---

## 🗺️ App Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero slideshow |
| `/login` | Login page |
| `/signup` | Register page |
| `/home` | Home feed with photo strip |
| `/locals` | Browse all local profiles |
| `/map` | Interactive map — find locals by location |
| `/profile` | Your own profile (editable) |
| `/profile/:id` | View any user's profile |
| `/inbox` | Message inbox |
| `/messages/:chatId` | Chat window |
| `/questions` | Community Q&A |
| `/my-requests` | Traveler's sent stay requests |
| `/local-requests` | Local's incoming stay requests |
| `/request-stay/:localId` | Send a stay request to a local |
| `/verification` | Submit ID for verification |
| `/admin` | Admin dashboard (admin role only) |

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port (default: 3000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `NODE_ENV` | `development` or `production` |

---

## 📡 API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/profiles` | List all profiles |
| GET | `/api/profiles/:userId` | Get profile by user ID |
| GET | `/api/stay/my` | Get my stay requests |
| POST | `/api/stay` | Send a stay request |
| PATCH | `/api/stay/:id` | Accept / reject a request |
| GET | `/api/chat/:chatId` | Get chat messages |
| POST | `/api/chat/:chatId` | Send a message |
| GET | `/api/chat/inbox` | Get inbox |
| GET | `/api/notifications` | Get notifications |
| POST | `/api/verification` | Submit ID verification |
| GET | `/api/questions` | List Q&A |
| GET | `/api/admin/stats` | Admin stats |

---

## 👥 Contributors

- [pratik00001](https://github.com/pratik00001)
- [at019305-dev](https://github.com/at019305-dev)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
