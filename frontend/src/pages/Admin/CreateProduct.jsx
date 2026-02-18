import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const {Option} = Select

const CreateProduct = () => {
  const navigate= useNavigate()
  const [categories, setCategories] = useState([])
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("")
  const [quantity,setQuantity] = useState("")
  const [shipping,setShipping] = useState("")
  const [photo,setPhoto] = useState(null)
  
// get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  useEffect(() => {
      getAllCategory();
    }, []);

  
  // create product
  const handelCreate = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append("name",name)
      productData.append("description",description)
      productData.append("price",price)
      productData.append("quantity",quantity)
      productData.append("photo",photo)
      productData.append("category",category)
      const { data } =await axios.post('/api/v1/product/create-product', productData)
      if (data?.success) {
        toast.success('Product Created Successfully')
        navigate('/dashboard/admin/products')
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  return (
      
          <Layout>
      <div className="container mx-auto p-6">
        <div className="flex gap-8">
          <div className="w-64">
            <AdminMenu />
          </div>
          <div className="flex-1">
            <h1 className='font-extrabold'>Create Product</h1>
            <div className="m-1 w-3/4">
              <Select bordered={false} placeholder="Select a category" size='large' showSearch className='block w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3' 
              onChange={(value) =>{setCategory(value)}}
              >
                {categories?.map(c => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
               ))} 
              </Select>
              <div className="mb-3">
                <label className='border border-gray-500 text-black bg-transparent hover:bg-gray-600 hover:text-white font-semibold py-2 px-4 rounded'>
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept='image/*'
                    onChange={(e) => setPhoto(e.target.files[0])} hidden />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className='text-center'>
                    <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className='h-auto max-w-full'/>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input type="text" value={name} placeholder='write a name'
                  className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea value={description}
                placeholder='write a description'
                  className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  onChange={(e) => setDescription(e.target.value)}
                />
                
              </div>
              <div className="mb-3">
                <input type="number" value={price} placeholder='write a price'
                  className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input type="number" value={quantity} placeholder='write a quantity'
                  className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size='large'
                  showSearch
                  className='block w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3'
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handelCreate}>Create Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default CreateProduct