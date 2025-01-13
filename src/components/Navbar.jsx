import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const location = useLocation();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast("Error Logging out!");
    }
  };

  return (
    <nav className="bg-primary text-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo.jpeg"
            alt="MCMS Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-lg font-bold ">Medical Camp MS</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-secondary">
            Home
          </Link>
          <Link to="/available-camps" className="hover:text-secondary">
            Available Camps
          </Link>
          {!currentUser && (
            <Link
              to="/join-us"
              className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100"
            >
              Join Us
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {currentUser && (
          <div className="relative">
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
                <p className="block px-4 py-2 text-sm font-bold">
                  {currentUser.name}
                </p>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isDropdownOpen && !currentUser && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className="block text-white hover:text-secondary">
            Home
          </Link>
          <Link
            to="/available-camps"
            className="block text-white hover:text-secondary"
          >
            Available Camps
          </Link>
          <Link
            to="/join-us"
            className="block bg-white text-primary px-4 py-2 rounded hover:bg-gray-100"
          >
            Join Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
