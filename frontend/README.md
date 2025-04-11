# 🚀 Full Stack App — React + Vite & Node.js + Fastify

This is a full-stack application built with **React (Vite)** on the frontend and **Node.js with Fastify** on the backend.  
The project is organized into two folders: `frontend/` and `backend/`.

---

## 📁 Project Structure

```
root/
├── backend/    # Fastify backend API
└── frontend/   # React frontend (Vite)
```

---

## 📦 Installation

Make sure you have **Node.js** and **npm** installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

#### 🔧 Backend

```bash
cd backend
npm install
```

#### 💻 Frontend

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the project

### Start the Backend

From the `backend` folder:

```bash
npm run dev
```

The Fastify server will start on [http://localhost:3000](http://localhost:3000)

---

### Start the Frontend

From the `frontend` folder:

```bash
npm run dev
```

The Vite development server will start on [http://localhost:5173](http://localhost:5173)

> ⚠️ Make sure your frontend is configured to call the backend (e.g., via `http://localhost:3000/api`) in development.

---

## 🛠️ Technologies Used

- **Frontend:** React, Vite, JavaScript
- **Backend:** Node.js, Fastify
- **Package Manager:** npm

---

## 📌 Notes

- Both frontend and backend run separately.
- CORS must be enabled on the backend to allow frontend communication during development.
- You can later use tools like `Docker`, `Nginx`, or `PM2` for production deployment.

---
