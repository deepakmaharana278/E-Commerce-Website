import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {
  const params = useParams()
  const [product, setProduct] = useState({}) 
  const [relatedProducts, setRelatedProducts] = useState([])
  const navigate = useNavigate();

  // initial product details
  useEffect(() => {
    if (params?.slug) getProduct()
  }, [params?.slug])

  // get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      setProduct(data?.product)
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error)
    }
  }

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${ pid }/${ cid }`)
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        {!product ? (
          <p className="text-center text-lg">Loading product details...</p>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Image */}
              <div className="md:w-1/2 flex justify-center items-center">
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="w-full max-w-md rounded shadow"
                />
              </div>
              {/* Product Details */}
              <div className="md:w-1/2">
                <h1 className="text-center text-2xl font-bold mb-6">Product Details</h1>
                <h6 className="text-lg mb-2"><span className='font-bold'>Name :</span> {product.name}</h6>
                <h6 className="text-lg mb-2"><span className='font-bold'>Description :</span> {product.description}</h6>
                <h6 className="text-lg mb-2"><span className='font-bold'>Price :</span> ${product.price}</h6>
                <h6 className="text-lg mb-2"><span className='font-bold'>Category :</span> {product.category?.name}</h6>
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded  mt-4">Add To Cart</button>
              </div>
            </div>
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
                {relatedProducts.length<1 && (<p>No Similar Products found</p>)}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow rounded-lg overflow-hidden flex flex-col">
                <img
                  src={`/api/v1/product/product-photo/${ product._id }`}
                  alt={product.name}
                  className="h-48 w-full object-cover" />
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-base font-semibold text-gray-800 mb-1">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description.substring(0, 60)}...</p>
                  <p className="text-gray-600 mb-4 font-semibold">${Number(product.price).toFixed(2)}</p>
                  <button
                      className="bg-black hover:bg-gray-900 text-white text-sm sm:text-base font-semibold py-2 px-3 sm:px-4 rounded w-full mt-auto"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      View Details
                    </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded w-full mt-2">Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default ProductDetails
