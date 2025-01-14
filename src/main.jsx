import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Root from "./pages/Root";
import Home from "./pages/Home";
import { JoinUs } from "./pages/JoinUs";
import { Register } from "./pages/Register";
import { AuthProvider } from "./Auth/AuthContext";
import AvailableCamps from "./pages/AvailableCamps";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import OrganizerProfile from "./components/OrganizerDashboard/OrganizerProfile";
import AddCamp from "./components/OrganizerDashboard/AddCamp";
import ManageUsers from "./components/OrganizerDashboard/ManageUsers";
import ManageCamps from "./components/OrganizerDashboard/ManageCamps";
import CampDetails from "./pages/CampDetails";
import PrivateRoute from "./utils/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";

const queryClient = new QueryClient();
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
          <PrivateRoute>
            <OrganizerDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "profile",
            element: <OrganizerProfile />,
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
            element: <div>hello</div>,
          },
          {
            path: "profile",
            element: <div>hello</div>,
          },
          {
            path: "registered-camps",
            element: <div>hello</div>,
          },
          {
            path: "payment-history",
            element: <div>hello</div>,
          },
        ],
      },
    ],

    // errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
        <ToastContainer position="top-center" />
      </AuthProvider>
    </QueryClientProvider>{" "}
  </StrictMode>
);
