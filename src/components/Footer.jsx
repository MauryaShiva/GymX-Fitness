import React from "react";
import Logo from "../assets/images/Logo-1.png";
import { YouTube, Instagram, Facebook, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white mt-24 border-t border-gray-800">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <img
              src={Logo}
              alt="GymX Logo"
              className="w-40 mb-6 brightness-200"
            />

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              GymX is your ultimate fitness companion. Discover exercises, build
              stronger habits, and achieve your fitness goals with smart workout
              recommendations.
            </p>

            <div className="flex gap-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-red-500 p-3 rounded-full transition duration-300"
              >
                <YouTube sx={{ fontSize: 22 }} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-pink-500 p-3 rounded-full transition duration-300"
              >
                <Instagram sx={{ fontSize: 22 }} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition duration-300"
              >
                <Facebook sx={{ fontSize: 22 }} />
              </a>

              <a
                href="https://x.com/themauryashiva"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-sky-500 p-3 rounded-full transition duration-300"
              >
                <Twitter sx={{ fontSize: 22 }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 tracking-wide text-gray-200">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="/"
                  className="hover:text-red-500 transition duration-200"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#exercises"
                  className="hover:text-red-500 transition duration-200"
                >
                  Exercises
                </a>
              </li>

              <li>
                <a
                  href="#workouts"
                  className="hover:text-red-500 transition duration-200"
                >
                  Workouts
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="hover:text-red-500 transition duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 tracking-wide text-gray-200">
              Resources
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-red-500 transition">
                  Fitness Blog
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-red-500 transition">
                  Workout Plans
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-red-500 transition">
                  Nutrition Guide
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-red-500 transition">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 tracking-wide text-gray-200">
              Subscribe
            </h3>

            <p className="text-gray-400 text-sm mb-4">
              Get fitness tips, workouts and updates delivered to your inbox.
            </p>

            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-red-500 text-sm"
              />

              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 transition py-3 rounded-lg font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
          <p>© {new Date().getFullYear()} GymX. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-red-500 transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Terms of Service
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
