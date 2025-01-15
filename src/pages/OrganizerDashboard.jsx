import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const OrganizerDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="hidden lg:block w-44 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold text-center mb-8">Dashboard Menu</h2>
        <ul className="space-y-4">
          <li>
            <Link to="profile" className="text-white hover:text-primary">
              Organizer Profile
            </Link>
          </li>
          <li>
            <Link to="add-camp" className="text-white hover:text-primary">
              Add A Camp
            </Link>
          </li>
          <li>
            <Link to="manage-camps" className="text-white hover:text-primary">
              Manage Camps
            </Link>
          </li>
          <li>
            <Link to="manage-users" className="text-white hover:text-primary">
              Manage Users
            </Link>
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
              <Link to="profile" className="text-white hover:text-primary">
                Organizer Profile
              </Link>
            </li>
            <li>
              <Link to="add-camp" className="text-white hover:text-primary">
                Add A Camp
              </Link>
            </li>
            <li>
              <Link to="manage-camps" className="text-white hover:text-primary">
                Manage Camps
              </Link>
            </li>
            <li>
              <Link to="manage-users" className="text-white hover:text-primary">
                Manage Users
              </Link>
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
