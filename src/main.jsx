import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";

import Root from "./pages/Root";
import Home from "./pages/Home";
import { JoinUs } from "./pages/JoinUs";
import { Register } from "./pages/Register";
import { AuthProvider } from "./Auth/AuthContext";
import AvailableCamps from "./pages/AvailableCamps";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import OrganizerProfile from "./components/OrganizerDashboard/OrganizerProfile";

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
        path: "/organizer-dashboard",
        element: <OrganizerDashboard />,
        children: [
          {
            path: "profile",
            element: <OrganizerProfile />,
          },
        ],
      },
    ],

    // errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ToastContainer position="top-center" />
    </AuthProvider>
  </StrictMode>
);
