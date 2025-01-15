import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Root from "./pages/Root";
import Home from "./pages/Home";
import { JoinUs } from "./pages/JoinUs";
import { Register } from "./pages/Register";
import { AuthProvider } from "./Auth/AuthContext";
import AvailableCamps from "./pages/AvailableCamps";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import { ErrorPage } from "./components/ErrorPage";

import AddCamp from "./components/OrganizerDashboard/AddCamp";
import ManageUsers from "./components/OrganizerDashboard/ManageUsers";
import ManageCamps from "./components/OrganizerDashboard/ManageCamps";
import CampDetails from "./pages/CampDetails";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoute";
import UserDashboard from "./pages/UserDashboard";
import Analytics from "./components/UserDashboard/Analytics";

import RegisteredCamps from "./components/UserDashboard/RegisteredCamps";
import UserProfile from "./components/UserDashboard/UserProfile";

const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/join-us",
        element: <JoinUs />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/available-camps",
        element: <AvailableCamps />,
      },
      {
        path: "/camp-details/:id",
        element: <CampDetails />,
      },
      {
        path: "/organizer-dashboard",
        element: (
          <AdminRoute>
            <OrganizerDashboard />
          </AdminRoute>
        ),
        children: [
          {
            path: "profile",
            element: <UserProfile />,
          },
          {
            path: "add-camp",
            element: <AddCamp />,
          },
          {
            path: "manage-camps",
            element: <ManageCamps />,
          },
          {
            path: "manage-users",
            element: <ManageUsers />,
          },
        ],
      },
      {
        path: "/user-dashboard",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
          {
            path: "registered-camps",
            element: <RegisteredCamps />,
          },
          {
            path: "payment-history",
            element: <div>hello</div>,
          },
        ],
      },
    ],

    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
          <ToastContainer position="top-center" />
        </AuthProvider>
      </QueryClientProvider>{" "}
    </Elements>
  </StrictMode>
);
