import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd"


const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart()

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const categoryRef = useRef();
  const userRef = useRef();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target)
      ) {
        setCategoryDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeClass =
    "underline underline-offset-8 decoration-gray-400 font-medium text-gray-300 transition-all duration-300";
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
          <SearchInput />
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              HOME
            </NavLink>
          </li>


          {/* Category Dropdown */}
          <li className="relative" ref={categoryRef}>
            <button
              onClick={() => setCategoryDropdownOpen((prev) => !prev)}
              className="flex items-center px-3 py-2 font-medium hover:bg-gray-800 rounded transition focus:outline-none focus:ring-2 focus:ring-gray-300"
              type="button"
              aria-haspopup="true"
              aria-expanded={categoryDropdownOpen}
            >
              CATEGORY
              <svg
                className="w-4 h-4 ml-1 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {categoryDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-44 bg-gray-700 py-2 rounded shadow-lg z-50 min-w-max">
                {/* All Categories link */}
                <li>
                  <NavLink
                    to="/categories"
                    onClick={() => setCategoryDropdownOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-white hover:bg-gray-600  whitespace-nowrap"
                  >
                    All Categories
                  </NavLink>
                </li>
                <hr className="my-1 border-gray-500" />
                {/* Dynamic Categories */}
                {categories?.map((c) => (
                  <li key={c._id}>
                    <NavLink
                      to={`/category/${ c.slug }`}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-600 whitespace-nowrap"
                    >
                      {c.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>


          {!auth.user ? (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  REGISTER
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  LOGIN
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {/* User Dropdown */}
              <li className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="flex items-center px-3 py-2 font-medium hover:bg-gray-800 rounded transition focus:outline-none focus:ring-2 focus:ring-gray-300"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={userDropdownOpen}
                >
                  {auth.user.name}
                  <svg
                    className="w-4 h-4 ml-1 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {userDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-32 bg-slate-700 py-2 rounded shadow-lg z-50 min-w-max">
                    <li>
                      <NavLink
                        to={`/dashboard/${ auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        onClick={() => setUserDropdownOpen(false)}
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
            <Badge size="small" offset={[10,1]} count={cart?.length} showZero>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
              >
                <span className="text-gray-300 font-semibold hover:text-gray-500">CART</span>
              </NavLink>
            </Badge>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden focus:outline-none transition-transform duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-200" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-200" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${ menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 py-3 space-y-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? activeClass : inactiveClass) + " block"
            }
            onClick={() => setMenuOpen(false)}
          >
            HOME
          </NavLink>

          {/* Category list directly in mobile menu */}
          <div>
            <span className="block text-gray-600 font-medium mb-1">
              Categories
            </span>
            <ul className="pl-2 space-y-1">
              {categories?.map((c) => (
                <li key={c._id}>
                  <NavLink
                    to={`/category/${ c.slug }`}
                    className={({ isActive }) =>
                      (isActive ? activeClass : inactiveClass) + " block"
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {!auth.user ? (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  (isActive ? activeClass : inactiveClass) + " block"
                }
                onClick={() => setMenuOpen(false)}
              >
                REGISTER
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  (isActive ? activeClass : inactiveClass) + " block"
                }
                onClick={() => setMenuOpen(false)}
              >
                LOGIN
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={`/dashboard/${ auth?.user?.role === 1 ? "admin" : "user"
                  }`}
                className={({ isActive }) =>
                  (isActive ? activeClass : inactiveClass) + " block"
                }
                onClick={() => setMenuOpen(false)}
              >
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

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              (isActive ? activeClass : inactiveClass) + " block"
            }
            onClick={() => setMenuOpen(false)}
          >
            CART&nbsp;<span className="text-gray-400">({cart?.length})</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
