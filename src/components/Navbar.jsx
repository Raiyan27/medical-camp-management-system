import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../hooks/useAxiosPublic";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, admin } = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [userData, setUserData] = useState("guest");

  const auth = getAuth();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast("Logged out successfully!");
      setIsDropdownOpen(false);
      navigate("/");
    } catch (error) {
      toast("Error Logging out!");
    }
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-orange-200"
      : "hover:text-secondary";
  };

  return (
    <nav className="bg-primary text-white py-4 px-6 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo.jpeg"
            alt="MCMS Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-lg font-bold ">Medical Camp MS</span>
        </Link>

        <div className="flex items-center justify-center gap-6">
          <div className="hidden md:flex space-x-6 justify-center items-center">
            <Link to="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link
              to="/available-camps"
              className={getLinkClass("/available-camps")}
            >
              Available Camps
            </Link>
            {currentUser && (
              <>
                <Link
                  to="/user-dashboard/registered-camps"
                  className={getLinkClass("/user-dashboard/registered-camps")}
                >
                  Registered Camps
                </Link>
                <Link
                  to="/user-dashboard/profile"
                  className={getLinkClass("/user-dashboard/profile")}
                >
                  Profile
                </Link>
              </>
            )}
            <Link to="/about-us" className={getLinkClass("/about-us")}>
              About Us
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
                    {currentUser.displayName} {admin ? "(Admin)" : ""}
                  </p>
                  <Link
                    to="/"
                    className="md:hidden block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Home
                  </Link>
                  <Link
                    to="/available-camps"
                    className="md:hidden block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Available Camps
                  </Link>
                  <Link
                    to="/about-us"
                    className="md:hidden block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/user-dashboard/registered-camps"
                    className="md:hidden block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Registered Camps
                  </Link>
                  <Link
                    to="/user-dashboard/profile"
                    className="md:hidden block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  {admin ? (
                    <Link
                      to="/user-dashboard/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    ""
                  )}
                  {admin ? (
                    <Link
                      to="/organizer-dashboard/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Organizer Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/user-dashboard/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-red-400 text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isDropdownOpen && !currentUser && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className={`block ${getLinkClass("/")}`}>
            Home
          </Link>
          <Link
            to="/available-camps"
            className={`block ${getLinkClass("/available-camps")}`}
          >
            Available Camps
          </Link>
          <Link to="/about-us" className={`block ${getLinkClass("/about-us")}`}>
            About Us
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
