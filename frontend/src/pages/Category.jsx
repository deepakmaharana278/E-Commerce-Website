import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';


const Category = () => {
  const categories = useCategory()

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((c) => (
            <div key={c._id} className="flex items-center justify-center">
              <Link
                to={`/category/${c.slug}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition w-3/6 text-center" 
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Category