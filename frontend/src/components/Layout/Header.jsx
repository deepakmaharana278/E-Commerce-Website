import React, { useState,useEffect,useRef } from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeClass = "underline underline-offset-8 decoration-gray-400 font-medium text-gray-300 transition-all duration-300";
  const inactiveClass = "hover:text-gray-500 transition-colors duration-300";

  return (
    <nav className="bg-gray-900 border-b sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <div className="flex items-center space-x-2 font-semibold text-gray-300">
          <ShoppingCartIcon className="h-5 w-5" />
          <span>UNI CART</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden sm:flex items-center gap-6 text-gray-300 text-sm">
          <SearchInput/>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/category" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              CATEGORY
            </NavLink>
          </li>
          {!auth.user ? (
            <>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
                  REGISTER
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
                  LOGIN
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="relative" ref={dropdownRef}>
              {/* Dropdown Toggle */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center px-3 py-2 font-medium hover:bg-gray-800 rounded transition focus:outline-none focus:ring-2 focus:ring-gray-300"
                type="button"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                {auth.user.name}
                <svg
                  className="w-4 h-4 ml-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-32 bg-slate-700 py-2 rounded shadow-lg z-50 min-w-max">
                  <li>
                    <NavLink
                      to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-600 whitespace-nowrap"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 whitespace-nowrap"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
            </>
          )}
          <li>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              CART&nbsp;<span className="text-gray-400">(0)</span>
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="sm:hidden focus:outline-none transition-transform duration-300" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <XMarkIcon className="h-6 w-6 text-gray-200" /> : <Bars3Icon className="h-6 w-6 text-gray-200" />}
        </button>
      </div>

      {/* Mobile Menu with transition */}
      <div
        className={`sm:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-3">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass) + " block"} onClick={() => setMenuOpen(false)}>
            HOME
          </NavLink>
          <NavLink to="/category" className={({ isActive }) => (isActive ? activeClass : inactiveClass) + " block"} onClick={() => setMenuOpen(false)}>
            CATEGORY
          </NavLink>
          {!auth.user ? (
            <>
              <NavLink to="/register" className={({ isActive }) => (isActive ? activeClass : inactiveClass) + " block"} onClick={() => setMenuOpen(false)}>
                REGISTER
              </NavLink>
              <NavLink to="/login" className={({ isActive }) => (isActive ? activeClass : inactiveClass) + " block"} onClick={() => setMenuOpen(false)}>
                LOGIN
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeClass : inactiveClass) + " block"} onClick={() => setMenuOpen(false)}>
                DASHBOARD
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                LOGOUT
              </button>
            </>
          )}
          <NavLink to="/cart" className={({ isActive }) => (isActive ? activeClass : inactiveClass) + " block"} onClick={() => setMenuOpen(false)}>
            CART&nbsp;<span className="text-gray-400">(0)</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
