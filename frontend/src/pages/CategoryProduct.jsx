import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/cart'

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [cart,setCart] = useCart()

  useEffect(() => {
    if(params?.slug) getPoductsByCat()
  },[params?.slug])
  const getPoductsByCat = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-category/${ params.slug }`)
      setProducts(data?.products)
      setCategory(data?.category)
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
      <Layout>
          <div className='container mx-auto'>
        <h1 className='text-center text-xl font-bold'>Category - {category?.name}</h1>
        <p className='text-center'>{products?.length} result found</p>
        <div className="flex flex-row">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
                >
                  <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    className="h-40 sm:h-48 w-full object-cover"
                  />
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">
                      {product.description.substring(0, 60)}...
                    </p>
                    <p className="text-gray-800 font-bold mb-3">
                      ${Number(product.price).toFixed(2)}
                    </p>
                    <button
                      className="bg-black hover:bg-gray-900 text-white text-sm sm:text-base font-semibold py-2 px-3 sm:px-4 rounded w-full mt-auto"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white text-sm sm:text-base font-semibold py-2 px-3 sm:px-4 rounded w-full mt-2"
                      onClick={() => {
                        setCart([...cart, product])
                        toast.success("Item Added to Cart")
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
          </div>
    </Layout>
  )
}

export default CategoryProduct