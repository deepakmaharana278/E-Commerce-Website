import React from "react";

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="font-bold">Category Form</label>
          <input
            type="text"
            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
          Create
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
