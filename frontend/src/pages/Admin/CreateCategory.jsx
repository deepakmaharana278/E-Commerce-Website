import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from 'antd'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName,setUpdatedName] = useState("")
  
  // handle Form
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/v1/category/create-category", { name })
      if (data.success) {
        toast.success(`${ name } is created`)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong in input form")
    }
  }

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

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/v1/category/update-category/${ selected._id }`, { name: updatedName })
      if (data.success) {
        toast.success(`${updatedName} is updated`)
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  // delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${ pId }`)
      if (data.success) {
        toast.success(`category is deleted`)
        getAllCategory()
      } else {
        toast.error(data.message)
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
            <h1 className="font-extrabold text-2xl mb-6">Manage Category</h1>
            <div className="p-3">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className="bg-white rounded shadow p-6">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold">Name</th>
                    <th className="text-left px-4 py-2 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example row, replace with dynamic content */}
                  {categories?.map((c) => (
                    <tr key={c._id} className="border-t">
                      <td className="px-4 py-2">{c.name}</td>
                      <td>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white m-2 font-semibold py-2 px-4 rounded"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c)
                          }}
                          
                        >Edit</button>
                        <button className="bg-red-600 hover:bg-red-700 text-white m-2 font-semibold py-2 px-4 rounded"
                        onClick={() => {handleDelete(c._id)}}
                        >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
