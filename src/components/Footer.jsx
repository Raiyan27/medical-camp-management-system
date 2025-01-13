import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About Section */}
        <div>
          <Link to="/" className="flex items-center space-x-3 mb-4">
            <img
              src="/logo.jpeg"
              alt="MCMS Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-lg font-bold text-text">Medical Camp MS</span>
          </Link>
          <p className="text-sm">
            Helping organizers and participants easily manage and coordinate
            medical camps with efficiency and care.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/available-camps" className="hover:text-secondary">
                Available Camps
              </Link>
            </li>
            <li>
              <Link to="/join-us" className="hover:text-secondary">
                Join Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-secondary">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li>Email: support@mcms.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Health Ave, Wellness City</li>
          </ul>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} Medical Camp Management System. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
