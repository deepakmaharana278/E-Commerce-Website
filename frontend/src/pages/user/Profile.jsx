import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Profile = () => {
  return (
    <Layout>
          <div className="container mx-auto p-6">
        <div className="flex gap-8">
          <div className="w-64">
            <UserMenu/>
          </div>
          <div className="flex-1">
            <h1 className='font-extrabold'>Your Profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile