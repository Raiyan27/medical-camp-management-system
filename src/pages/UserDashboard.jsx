import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { MdAnalytics } from "react-icons/md";
import { Link, Outlet, NavLink } from "react-router-dom";

const UserDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:block w-52 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Participant Dashboard</h2>
        <ul>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `block mb-4 ${
                  isActive
                    ? "text-accent font-bold flex items-center"
                    : "hover:text-accent flex items-center"
                }`
              }
            >
              <CgProfile className="mr-2" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="analytics"
              className={({ isActive }) =>
                `block mb-4 ${
                  isActive
                    ? "text-accent font-bold flex items-center"
                    : "hover:text-accent flex items-center"
                }`
              }
            >
              <MdAnalytics className="mr-2" />
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="registered-camps"
              className={({ isActive }) =>
                `block mb-4 ${
                  isActive
                    ? "text-accent font-bold flex items-center"
                    : "hover:text-accent flex items-center"
                }`
              }
            >
              <GiCampingTent className="mr-2" />
              Registered Camps
            </NavLink>
          </li>
          <li>
            <NavLink
              to="payment-history"
              className={({ isActive }) =>
                `block mb-4 ${
                  isActive
                    ? "text-accent font-bold flex items-center"
                    : "hover:text-accent flex items-center"
                }`
              }
            >
              <FaMoneyCheckAlt className="mr-2" />
              Payment History
            </NavLink>
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
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  `block text-white ${
                    isActive
                      ? "text-blue-400 font-bold flex items-center"
                      : "hover:text-blue-400 flex items-center"
                  }`
                }
              >
                <CgProfile className="mr-2" />
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="analytics"
                className={({ isActive }) =>
                  `block text-white ${
                    isActive
                      ? "text-blue-400 font-bold flex items-center"
                      : "hover:text-blue-400 flex items-center"
                  }`
                }
              >
                <MdAnalytics className="mr-2" />
                Analytics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="registered-camps"
                className={({ isActive }) =>
                  `block text-white ${
                    isActive
                      ? "text-blue-400 font-bold flex items-center"
                      : "hover:text-blue-400 flex items-center"
                  }`
                }
              >
                <GiCampingTent className="mr-2" />
                Registered Camps
              </NavLink>
            </li>
            <li>
              <NavLink
                to="payment-history"
                className={({ isActive }) =>
                  `block text-white ${
                    isActive
                      ? "text-blue-400 font-bold flex items-center"
                      : "hover:text-blue-400 flex items-center"
                  }`
                }
              >
                <FaMoneyCheckAlt className="mr-2" />
                Payment History
              </NavLink>
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
