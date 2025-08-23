import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const [auth] = useAuth();
  return (
      <Layout>
          <div className="container mx-auto p-6">
        <div className="flex gap-8">
          <div className="w-64">
            <UserMenu />
          </div>

          <div className="flex-1">
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-xl font-semibold mb-4">User Information</h3>
              <p className="mb-2"><strong>Name:</strong> {auth?.user?.name}</p>
              <p className="mb-2"><strong>Email:</strong> {auth?.user?.email}</p>
              <p><strong>Address:</strong> {auth?.user?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard