import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:1111";

const DatabaseProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const GetAllProducts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

  
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await axios.get(`${API_BASE_URL}/api/admin/get-All-Product`, { headers });

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    GetAllProducts();
  }, []);

  // Helper function to get image URL or default image
  const getImageUrl = (images) => {
    if (images && images.length > 0) {
      return `${API_BASE_URL}/${images[0]}`;
    }
    return 'default-image-url.jpg'; // Default image if no product image is available
  };

  return (
    <div className="grid pb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-full">
            <a href="#" className="relative mx-3 mt-3 flex h-64 overflow-hidden rounded-xl">
              <img
                src={getImageUrl(product.productImage)}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                  {product.discount} OFF
                </span>
              )}
            </a>
            <div className="mt-4 px-5 pb-5 flex-grow">
              <a href="#">
                <h5 className="text-xl tracking-tight text-slate-900">{product.title}</h5>
              </a>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                  {product.slashPrice && (
                    <span className="text-xl text-slate-900 line-through ml-2">${product.slashPrice}</span>
                  )}
                </p>
              </div>
              <a href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to cart
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className='text-[#ff0000] text-3xl font-serif'>No products found...</p>
      )}
    </div>
  );
};

export default DatabaseProduct;
