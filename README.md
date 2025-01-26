# Full Stack Task Management App

This is a full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). The backend handles user authentication, menu management, and order processing.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
  - [Auth Routes](#auth-routes)
  - [Menu Routes](#menu-routes)
  - [Order Routes](#order-routes)
- [Frontend](#frontend)
  - [Components](#components)
  - [Pages](#pages)
  - [Context](#context)
- [Usage](#usage)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/full-stack-task-management-app.git
    cd full-stack-task-management-app
    ```

2. Install dependencies for the backend:
    ```sh
    cd backend
    npm install
    ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).

4. Start the backend server:
    ```sh
    npm start
    ```

5. Install dependencies for the frontend:
    ```sh
    cd ../frontend
    npm install
    ```

6. Start the frontend development server:
    ```sh
    npm start
    ```

## Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

## API Routes

### Auth Routes

- **POST /auth/register**
  - Registers a new user.
  - Request body: `{ "username": "string", "password": "string" }`
  - Response: `{ "message": "User registered successfully" }`

- **POST /auth/login**
  - Logs in a user.
  - Request body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "JWT token" }`

### Menu Routes

- **GET /menu/**
  - Fetches all menu items.
  - Response: `Array of menu items`

- **POST /menu/create**
  - Adds a new menu item.
  - Request body: `{ "name": "string", "category": "string", "price": "number", "availability": "boolean", "file": "file" }`
  - Response: `Created menu item`

- **PUT /menu/update/:id**
  - Updates a menu item.
  - Request body: `{ "name": "string", "category": "string", "price": "number", "availability": "boolean", "file": "file" }`
  - Response: `Updated menu item`

- **DELETE /menu/:id**
  - Deletes a menu item.
  - Response: `{ "message": "Menu item deleted successfully" }`

### Order Routes

- **POST /orders/**
  - Places a new order.
  - Request body: `{ "items": [{ "itemId": "string", "quantity": "number" }] }`
  - Response: `Created order`

- **GET /orders/**
  - Fetches all orders for the logged-in user.
  - Response: `Array of orders`

- **PUT /orders/:id**
  - Updates the status of an order.
  - Request body: `{ "status": "string" }`
  - Response: `Updated order`

- **DELETE /orders/:id**
  - Deletes an order.
  - Response: `{ "message": "Order deleted successfully" }`

## Frontend

### Components

- **AuthProtector**
  - Protects routes that require authentication.
  - Redirects to the login page if the user is not authenticated.

- **AuthLayout**
  - Layout for authentication pages (login and register).
  - Displays a centered form with a background.

### Pages

- **MenuPage**
  - Displays the list of menu items.
  - Allows users to add items to the cart.

- **CartPage**
  - Displays the items in the user's cart.
  - Allows users to place an order.

- **OrderPage**
  - Displays the user's orders.
  - Allows users to view order details.

- **LoginPage**
  - Allows users to log in.
  - Redirects to the menu page upon successful login.

- **RegisterPage**
  - Allows users to register.
  - Redirects to the login page upon successful registration.

### Context

- **AppContext**
  - Provides global state management for the application.
  - Manages user authentication, cart items, and order details.

## Usage

1. Register a new user using the `/auth/register` endpoint.
2. Log in using the `/auth/login` endpoint to get a JWT token.
3. Use the token in the `Authorization` header for protected routes.
4. Manage menu items using the `/menu` endpoints.
5. Place and manage orders using the `/orders` endpoints.
6. Use the frontend to interact with the application:
   - View and add menu items to the cart.
   - Place orders from the cart.
   - View and manage orders.
