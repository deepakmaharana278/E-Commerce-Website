import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
  const params = useParams()
  const [product, setProduct] = useState({}) 

  // initial product details
  useEffect(() => {
    if (params?.slug) getProduct()
  }, [params?.slug])

  // get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      setProduct(data?.product)
    } catch (error) {
      console.log(error)
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
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default ProductDetails
