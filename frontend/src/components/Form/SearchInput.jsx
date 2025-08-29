import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {

    const [values, setValues] = useSearch()
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`/api/v1/product/search/${ values.keyword }`)
            setValues({ ...values, results: data })
            navigate("/search");
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <form className="flex items-center gap-2" role="search" onSubmit={handleSubmit}>
        <input
          className="block bg-transparent w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e)=> setValues({...values,keyword:e.target.value})}
        />
        <button className="border border-green-600 text-green-600 bg-transparent hover:bg-green-600 hover:text-white font-semibold py-2 px-4 rounded transition" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
