import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/cart'

const ProductDetails = () => {
  const params = useParams()
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const navigate = useNavigate();
  const [cart, setCart] = useCart()

  // initial product details
  useEffect(() => {
    if (params?.slug) getProduct()
  }, [params?.slug])

  // get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${ params.slug }`)
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
      <div className="container mx-auto px-6 py-10 max-w-7xl">
        {!product ? (
          <p className="text-center text-lg text-gray-600">Loading product details...</p>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-12">
              {/* Product Image */}
              <div className="md:w-1/2 flex justify-center items-center">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full max-w-md rounded-3xl shadow-xl object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-center">
                <h1 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">Product Details</h1>
                <div className="space-y-4 text-gray-800 text-lg">
                  <p>
                    <span className="font-semibold">Name:</span> {product.name}
                  </p>
                  <p>
                    <span className="font-semibold">Description:</span> {product.description}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span>{" "}
                    <span className="text-pink-600 font-bold">${product.price}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Category:</span> {product.category?.name}
                  </p>
                </div>
                <button
                  className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-full shadow-lg transition"
                  onClick={() => {
                    setCart([...cart, product]);
                    toast.success("Item Added to Cart");
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
              <h2 className="text-2xl font-extrabold text-indigo-700 mb-6 border-b-2 border-indigo-300 pb-2">
                Similar Products
              </h2>
              {relatedProducts.length < 1 ? (
                <p className="text-center text-gray-500 text-lg">No Similar Products found</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {relatedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col group transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                      <img
                        src={`/api/v1/product/product-photo/${ product._id }`}
                        alt={product.name}
                        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{product.description.substring(0, 100)}...</p>
                        <p className="text-pink-600 font-bold text-lg mb-6">${Number(product.price).toFixed(2)}</p>
                        <button
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-full w-full shadow transition"
                          onClick={() => navigate(`/product/${ product.slug }`)}
                        >
                          View Details
                        </button>
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-full w-full shadow mt-3 transition"
                          onClick={() => {
                            setCart([...cart, product]);
                            toast.success("Item Added to Cart");
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

    </Layout>
  )
}

export default ProductDetails
