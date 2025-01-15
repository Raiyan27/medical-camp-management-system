import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const UserDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:block w-44 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Participant Dashboard</h2>
        <ul>
          <li>
            <Link to="analytics" className="block mb-4 hover:text-accent">
              Analytics
            </Link>
          </li>
          <li>
            <Link to="profile" className="block mb-4 hover:text-accent">
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="registered-camps"
              className="block mb-4 hover:text-accent"
            >
              Registered Camps
            </Link>
          </li>
          <li>
            <Link to="payment-history" className="block mb-4 hover:text-accent">
              Payment History
            </Link>
          </li>
        </ul>
      </div>

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
              <Link
                to="analytics"
                className="block text-white hover:text-accent"
              >
                Analytics
              </Link>
            </li>
            <li>
              <Link to="profile" className="block text-white hover:text-accent">
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="registered-camps"
                className="block text-white hover:text-accent"
              >
                Registered Camps
              </Link>
            </li>
            <li>
              <Link
                to="payment-history"
                className="block text-white hover:text-accent"
              >
                Payment History
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
