import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex gap-8">
          {/* Admin Menu Sidebar */}
          <div className="w-64">
            <AdminMenu />
          </div>

          {/* Admin Info Card */}
          <div className="flex-1">
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-xl font-semibold mb-4">Admin Information</h3>
              <p className="mb-2"><strong>Name:</strong> {auth?.user?.name}</p>
              <p className="mb-2"><strong>Email:</strong> {auth?.user?.email}</p>
              <p><strong>Contact:</strong> {auth?.user?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
