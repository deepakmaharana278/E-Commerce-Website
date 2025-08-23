import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-1 p-4 pb-20 min-h-screen bg-gradient-to-b from-sky-100 via-white to-rose-100">
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
