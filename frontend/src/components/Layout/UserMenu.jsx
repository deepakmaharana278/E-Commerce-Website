import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
   <div className="bg-white rounded shadow p-6">
      <h3 className="font-bold text-lg mb-4 text-center">Your Dashboard</h3>
      <nav className="flex flex-col space-y-3">
        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-100 ${
              isActive ? "bg-blue-200 font-semibold" : "text-blue-700"
            }`
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
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
  )
}

export default UserMenu