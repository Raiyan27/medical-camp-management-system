import { useState } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";

const UserDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar for Large Screens */}
      <div className="hidden lg:block w-44 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Participant Dashboard</h2>
        <ul>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `block mb-4 ${
                  isActive ? "text-accent font-bold" : "hover:text-accent"
                }`
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="analytics"
              className={({ isActive }) =>
                `block mb-4 ${
                  isActive ? "text-accent font-bold" : "hover:text-accent"
                }`
              }
            >
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="registered-camps"
              className={({ isActive }) =>
                `block mb-4 ${
                  isActive ? "text-accent font-bold" : "hover:text-accent"
                }`
              }
            >
              Registered Camps
            </NavLink>
          </li>
          <li>
            <NavLink
              to="payment-history"
              className={({ isActive }) =>
                `block mb-4 ${
                  isActive ? "text-accent font-bold" : "hover:text-accent"
                }`
              }
            >
              Payment History
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden w-full bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Participant Dashboard</h2>
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <ul className="mt-4 space-y-4">
            <li>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  `block text-white ${
                    isActive ? "text-blue-400 font-bold" : "hover:text-blue-400"
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="analytics"
                className={({ isActive }) =>
                  `block text-white ${
                    isActive ? "text-blue-400 font-bold" : "hover:text-blue-400"
                  }`
                }
              >
                Analytics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="registered-camps"
                className={({ isActive }) =>
                  `block text-white ${
                    isActive ? "text-blue-400 font-bold" : "hover:text-blue-400"
                  }`
                }
              >
                Registered Camps
              </NavLink>
            </li>
            <li>
              <NavLink
                to="payment-history"
                className={({ isActive }) =>
                  `block text-white ${
                    isActive ? "text-blue-400 font-bold" : "hover:text-blue-400"
                  }`
                }
              >
                Payment History
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
