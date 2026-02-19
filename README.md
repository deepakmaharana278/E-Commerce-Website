# 🛒 E-Commerce Website

A full-stack E-Commerce web application built using **React.js**, **Node.js**, **Express.js**, and **MongoDB**, with **Stripe payment integration**.

This project demonstrates a complete online shopping platform including authentication, product management, cart functionality, secure checkout, and admin controls.

---
## 🌐 Live Demo

🚀 **Deployed Application:**  
👉 https://e-commerce-website-ts3p.vercel.app/

> Hosted on Vercel
---

## 📖 Introduction

The **E-Commerce Website** is a full-stack application that allows users to browse products, add them to a cart, and securely complete purchases using Stripe.

It also includes an admin dashboard for managing products.

---

## 🚀 Features

| 👤 Authentication | 🛍️ Shopping | 💳 Payments | 📦 Orders | 🧑‍💼 Admin Panel | 📱 Responsive Design |
|------------------|-------------|------------|----------|----------------|-------------------|
| User registration | Product listing | Stripe integration | Order placement | Add products | Fully responsive UI |
| User login | Product details view | Secure checkout | Order history tracking | Edit products | Mobile-friendly layout |
| JWT authentication | Add to cart / Remove from cart |  |  | Delete products |  |
| Secure password hashing | Cart quantity updates |  |  |  |  |

---

## 🧱 Tech Stack

### Frontend
- React.js + Vite
- Axios
- Tailwind.css
- Tostify
- Antdesign

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Stripe API

---

## 📁 Project Structure

```
E-Commerce-Website/
│
├── backend/ # Express server & APIs
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/ # React application
│ ├── src/
│ ├── public/
│ └── package.json
│
├── package.json
└── README.md
```

---

## 💻 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/deepakmaharana278/E-Commerce-Website.git
cd E-Commerce-Website
```
#### ⚙ Backend Setup
```
cd backend
npm install

Create a .env file inside the backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key

start backend server:
- npm run start
```
#### 🎨 Frontend Setup
```
Open a new terminal:
cd frontend
npm install

Create a .env file in the frontend folder:
VITE_API_URL=http://localhost:5000

start frontend:
npm run dev
```
