import React from "react";
import Layout from "../components/Layout/Layout";

const Category = () => {
  const products = [
    { id: 1, name: "Product 1", price: "$25.00", image: "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 2, name: "Product 2", price: "$40.00", image: "https://plus.unsplash.com/premium_photo-1718913931807-4da5b5dd27fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww" },
    { id: 3, name: "Product 3", price: "$18.00", image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9vZGllfGVufDB8MHwwfHx8MA%3D%3D" },
    { id: 4, name: "Product 4", price: "$60.00", image: "https://media.istockphoto.com/id/1688993944/photo/blank-black-oversize-t-shirt-mockup-different-sides.webp?a=1&b=1&s=612x612&w=0&k=20&c=lJ9tTi12EQQC31JMed-sF7X7v-nsyKvvPHAVHX1iIoo=" },
    { id: 5, name: "Product 5", price: "$32.00", image: "https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHQlMjBzaGlydCUyMGRlc2lnbnxlbnwwfDB8MHx8fDA%3D" },
    { id: 6, name: "Product 6", price: "$50.00", image: "https://plus.unsplash.com/premium_photo-1707928723611-a7ce263d13cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8amFja2V0fGVufDB8MHwwfHx8MA%3D%3D" }
  ];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 py-10">
      
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop by Category</h1>
      <p className="text-gray-600 mb-8">
        Browse our selection of top products in this category. Click on a product to view more details.
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-sm hover:shadow-md transition p-4 bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-500 mb-2">{product.price}</p>
            <button className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
      </Layout>
    
  );
};

export default Category;
