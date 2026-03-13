# 🛒 E-Commerce Backend API

A production-ready RESTful backend for an e-commerce platform built with **Node.js**, **Express.js**, and **MongoDB**. Features secure authentication, full MVC architecture, and protected routes — built from scratch with a deep understanding of every layer.

---

## 🚀 Features

- **JWT Authentication** — Secure login/registration with token generation and cookie-based session management
- **Password Security** — bcrypt hashing with salt rounds; no plain-text passwords stored
- **Protected Routes** — Custom `isLoggedIn` middleware that verifies JWT and attaches user context to every request
- **MVC Architecture** — Clean separation of Models, Routes, and Utilities for scalability
- **Input Validation** — Duplicate email detection, wrong password handling, and invalid token responses
- **EJS Frontend** — Registration and login forms connected to backend via POST requests, styled with Tailwind CSS
- **Environment Config** — Sensitive credentials managed via `.env` and `dotenv`

---

## 🧠 What I Learned Building This

This wasn't a tutorial copy-paste. Here's what I genuinely understand after building this:

- How **bcrypt internally uses salt** to produce a different hash for the same password every time — and why that matters for security
- How **JWT tokens are structured** (header.payload.signature), how they're signed with a secret key, and how verification works
- How **middleware functions** sit between a request and a route handler — and how to use them to protect any endpoint
- Why **MVC structure** makes codebases maintainable as they grow
- How **cookie-based sessions** work vs. storing tokens in localStorage

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Templating | EJS |
| Styling | Tailwind CSS |
| Config | dotenv |
| Testing | Postman |

---

## 📁 Project Structure

```
├── config/
│   └── db.js               # MongoDB connection via Mongoose
├── models/
│   ├── user.model.js        # User schema (name, email, hashed password)
│   ├── product.model.js     # Product schema
│   └── owner.model.js       # Owner schema
├── routes/
│   ├── user.routes.js       # Register, Login, Profile
│   ├── product.routes.js    # Product CRUD
│   └── owner.routes.js      # Owner management
├── utils/
│   └── generateToken.js     # JWT token generation helper
├── middleware/
│   └── isLoggedIn.js        # JWT verification middleware
├── views/
│   └── register.ejs         # Registration form (EJS + Tailwind)
├── .env                     # Environment variables (not committed)
└── app.js                   # Entry point
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ecommerce-backend-api.git
cd ecommerce-backend-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### Environment Variables

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### Run the Server

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

---

## 📬 API Endpoints

### Auth Routes (`/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/register` | Register new user | ❌ |
| POST | `/users/login` | Login + receive JWT cookie | ❌ |
| GET | `/users/profile` | Get logged-in user profile | ✅ |

### Product Routes (`/products`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | ❌ |
| POST | `/products` | Create new product | ✅ |
| PUT | `/products/:id` | Update product | ✅ |
| DELETE | `/products/:id` | Delete product | ✅ |

---

## 🔐 How Authentication Works

```
1. User registers → password hashed with bcrypt → saved to MongoDB
2. User logs in → bcrypt compares input with stored hash
3. On success → JWT token generated → stored in HTTP-only cookie
4. Protected route hit → isLoggedIn middleware reads cookie
5. Middleware verifies JWT signature → attaches req.user → calls next()
6. If invalid/missing token → 401 Unauthorized returned
```

---

## ✅ Tested With Postman

- ✅ Registration end-to-end
- ✅ Login end-to-end  
- ✅ Wrong password → correct error response
- ✅ Unregistered email → correct error response
- ✅ Invalid/missing JWT → 401 response
- ✅ Protected routes blocked without valid token

---

## 🔮 Planned Improvements

- [ ] Add refresh token support
- [ ] Role-based access control (Admin / Customer)
- [ ] Product search and filtering
- [ ] Order management system
- [ ] Rate limiting and helmet.js security headers
- [ ] Deploy to Railway or Render

---

## 👨‍💻 Author

**Aditya Gupta**  
B.Tech CSE (AI/ML) | UEM Kolkata  
📧 aditya1007gupta@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/aditya-gupta-660a4b219?utm_source=share&utm_campaign=share_via&utm_content=profile)
