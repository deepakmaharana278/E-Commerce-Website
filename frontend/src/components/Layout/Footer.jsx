import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-6 text-gray-100 text-sm  bottom-0 left-0 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <h4 className="text-center">All Rights Reserved &copy; UniCart</h4>
        <p className="text-center mt-3 ">
          <Link to="/about" className="p-2 hover:underline">About</Link> |
          <Link to="/contact" className="p-2 hover:underline">Contact</Link> |
          <Link to="/policy" className="p-2 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;