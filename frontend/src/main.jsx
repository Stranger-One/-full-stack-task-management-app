import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuPage from "./pages/MenuPage.jsx";
import AuthLayout from "./pages/AuthLayout.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Register from "./pages/Register.jsx";
import AuthProtector from "./pages/AuthProtector.jsx";
import AppContext from "./context/AppContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <AuthProtector>
            <MenuPage />
          </AuthProtector>
        ),
      },
      {
        path: "orders",
        element: (
          <AuthProtector>
            <OrderPage />
          </AuthProtector>
        ),
      },
      {
        path: "cart",
        element: (
          <AuthProtector>
            <CartPage />
          </AuthProtector>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <AuthProtector>
        <AuthLayout />
      </AuthProtector>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AppContext>
    <RouterProvider router={router} />
  </AppContext>
);
