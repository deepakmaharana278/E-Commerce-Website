import React from 'react';
import Layout from '../components/Layout/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';


const Category = () => {
  const categories = useCategory()

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Shop By Category
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Explore our top product categories and discover your favorites.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {categories.map((c) => (
            <Link
              key={c._id}
              to={`/category/${ c.slug }`}
              className="group relative block bg-white rounded-3xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              <div className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-indigo-600">
                  {c.name}
                </h3>
              </div>
              <div
                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-400 to-blue-600 opacity-80 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              ></div>
            </Link>

          ))}
        </div>
      </div>

    </Layout>
  )
}

export default Category