# 📚 Online Bookstore Frontend

React frontend for the Online Bookstore coding kata.

The application communicates with the Spring Boot REST API and allows users to browse books, manage their shopping cart, authenticate using JWT, and place orders.

---

# Technologies

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Context API
- Vitest
- React Testing Library

---

# Features

## Authentication

- User registration
- User login
- JWT authentication
- Protected routes

## Books

- Display all available books
- View book information
- Add books to the shopping cart

## Shopping Cart

- View cart contents
- Update quantities
- Remove items
- Clear cart

## Checkout

- View order summary
- Complete checkout

## Orders

- View order history
- View order details

## UI

- Responsive navigation
- Loading spinner
- Error handling
- Toast notifications
- Custom 404 page

---

# Project Structure

```
src
│
├── api
│   ├── axiosClient.ts
│   ├── bookApi.ts
│   ├── cartApi.ts
│   └── orderApi.ts
│
├── components
│   ├── books
│   └── layout
│
├── context
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── ToastContext.tsx
│
├── models
│
├── pages
│
├── routes
│
├── test
│
├── utils
│
├── App.tsx
└── main.tsx
```

---

# Prerequisites

Before running the application, install:

- Node.js 20 or later
- npm

Verify the installation:

```bash
node -v
npm -v
```

---

# Installation

Clone the repository and navigate to the frontend project.

```bash
cd bookstore-frontend
```

Install the dependencies.

```bash
npm install
```

---


# Running the Application

Start the development server.

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# Backend Requirements

The Spring Boot backend must be running before starting the frontend.

Default backend URL:

```
http://localhost:8080
```

The frontend communicates with the backend through:

```
http://localhost:8080/api
```

---

# Authentication

The application uses JWT authentication.

After a successful login:

- The JWT access token is stored in Local Storage.
- Every API request automatically includes the Authorization header.
- Protected pages require authentication.
- Invalid or expired tokens automatically redirect the user to the login page.

---

# Testing

Frontend tests are written using:

- Vitest
- React Testing Library

Run all tests:

```bash
npm run test:run
```

---

# Error Handling

The frontend includes:

- Axios request interceptors
- Axios response interceptors
- Global error handling
- Loading indicators
- User-friendly error messages
- Toast notifications

---

# Architecture

The application follows a feature-based structure.

```
Pages
        │
        ▼
Components
        │
        ▼
Context API
        │
        ▼
Axios API Layer
        │
        ▼
Spring Boot REST API
```

---

# Author

Bahaa Ahmad