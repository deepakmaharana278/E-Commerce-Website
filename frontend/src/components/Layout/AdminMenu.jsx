import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="bg-white rounded shadow p-6">
      <h3 className="font-bold text-lg mb-4 text-center">Admin Panel</h3>
      <nav className="flex flex-col space-y-3">
        <NavLink
          to="/dashboard/admin/create-category"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-100 ${
              isActive ? "bg-blue-200 font-semibold" : "text-blue-700"
            }`
          }
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-100 ${
              isActive ? "bg-blue-200 font-semibold" : "text-blue-700"
            }`
          }
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-100 ${
              isActive ? "bg-blue-200 font-semibold" : "text-blue-700"
            }`
          }
        >
           Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-100 ${
              isActive ? "bg-blue-200 font-semibold" : "text-blue-700"
            }`
          }
        >
           Orders
        </NavLink>
        
      </nav>
    </div>
  );
};

export default AdminMenu;
