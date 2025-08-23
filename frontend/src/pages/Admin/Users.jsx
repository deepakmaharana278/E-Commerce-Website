import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex gap-8">
          <div className="w-64">
            <AdminMenu />
          </div>
          <div className="flex-1">
            <h1 className='font-extrabold'>All users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
