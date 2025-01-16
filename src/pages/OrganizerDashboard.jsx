import { useState } from "react";
import { FaUsersCog } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { MdAdminPanelSettings } from "react-icons/md";
import { TbCampfire } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";

const OrganizerDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="hidden lg:block w-52 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold text-center mb-8">Dashboard Menu</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold flex items-center"
                  : "text-white hover:text-primary flex items-center"
              }
            >
              <MdAdminPanelSettings className="mr-2" />
              Organizer Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="add-camp"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold flex items-center"
                  : "text-white hover:text-primary flex items-center"
              }
            >
              <TbCampfire className="mr-2" />
              Add A Camp
            </NavLink>
          </li>
          <li>
            <NavLink
              to="manage-camps"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold flex items-center"
                  : "text-white hover:text-primary flex items-center"
              }
            >
              <GiCampingTent className="mr-2" />
              Manage Camps
            </NavLink>
          </li>
          <li>
            <NavLink
              to="manage-users"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold flex items-center"
                  : "text-white hover:text-primary flex items-center"
              }
            >
              <FaUsersCog className="mr-2" />
              Manage Users
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="lg:hidden w-full bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dashboard Menu</h2>
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
                  isActive
                    ? "text-primary font-bold flex items-center"
                    : "text-white hover:text-primary flex items-center"
                }
              >
                <MdAdminPanelSettings className="mr-2" />
                Organizer Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="add-camp"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-bold flex items-center"
                    : "text-white hover:text-primary flex items-center"
                }
              >
                <TbCampfire className="mr-2" />
                Add A Camp
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-camps"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-bold flex items-center"
                    : "text-white hover:text-primary flex items-center"
                }
              >
                <GiCampingTent className="mr-2" />
                Manage Camps
              </NavLink>
            </li>
            <li>
              <NavLink
                to="manage-users"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-bold flex items-center"
                    : "text-white hover:text-primary flex items-center"
                }
              >
                <FaUsersCog className="mr-2" />
                Manage Users
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Organizer Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default OrganizerDashboard;
