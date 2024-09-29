import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";

const API_BASE_URL = "http://localhost:1111";

const AdminData = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [error, setError] = useState(null);

  // Fetch products using axios
  useEffect(() => {
    const GetAllProducts = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No token found. Please login.");
        }

        // Ensure the token is in the correct format
        const headers = { Authorization: `Bearer ${token}` };
        console.log("Set Token In Header Succes.... ", headers);

        const response = await axios.get(
          `${API_BASE_URL}/api/admin/get-All-Product`,
          { headers }
        );

        setProducts(response.data);
      } catch (error) {
        console.error(
          "Error fetching product data:",
          error.response?.data || error.message
        );
        setError(error.response?.data?.message || "Failed to load products.");
      }
    };

    GetAllProducts();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4">
      {/* Add Product Button */}
      <div className="flex justify-end mb-4">
        <NavLink to={"/addproduct"}>
          <button className="bg-[#1a34f7] hover:bg-[#ff6c28] font-serif duration-1000 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </NavLink>
      </div>

      {/* Display error if exists */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Responsive Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border font-serif px-2 py-2 text-center text-xs md:text-base">
                Title
              </th>
              <th className="border font-serif px-2 py-2 text-center text-xs md:text-base">
                Description
              </th>
              <th className="border font-serif px-2 py-2 text-center text-xs md:text-base">
                Image
              </th>
              <th className="border font-serif px-2 py-2 text-center text-xs md:text-base">
                Price
              </th>
              <th className="border font-serif px-2 py-2 text-center text-xs md:text-base">
                Slash Price
              </th>
              <th className="border font-serif px-2 py-2 text-center text-xs md:text-base">
                Discount
              </th>
              <th className="border font-serif px-2 py-2 text-center text-xs md:text-base">
                Category
              </th>
              <th className="border font-serif px-2 py-2 text-center text-xs md:text-base">
                Size
              </th>
              <th className="border font-serif px-2 py-2 text-center text-xs md:text-base">
                Color
              </th>
              <th className="border font-serif  px-2 py-2 text-center text-xs md:text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr key={index}>
                  <td className="border px-2 py-2 text-center text-xs md:text-base">
                    {product.title}
                  </td>
                  <td className="border px-2 py-2 text-center text-xs md:text-base">
                    {product.description.slice(0, 30)}...
                  </td>
                  <td className="border px-2 py-2 text-xs md:text-base flex items-center justify-center">
                    {product.productImage &&
                      product.productImage.length > 0 && (
                        <img
                          src={`${API_BASE_URL}/${product.productImage[0]}`}
                          alt={product.title}
                          className="w-12 h-12 md:w-20 md:h-20 object-cover"
                        />
                      )}
                  </td>

                  <td className="border px-2 py-2 text-center text-xs md:text-base">
                    ${product.price}
                  </td>
                  <td className="border px-2 py-2 text-center text-xs md:text-base">
                    ${product.slashPrice}
                  </td>
                  <td className="border px-2 py-2 text-center text-xs md:text-base">
                    {product.discount}
                  </td>
                  <td className="border px-2 py-2 text-center text-xs md:text-base">
                    {product.category}
                  </td>
                  <td className="border px-2 py-2 text-center text-xs md:text-base">
                    {product.size.join(", ")}
                  </td>
                  <td className="border px-2 py-2 text-center text-xs md:text-base">
                    {product.color.join(", ")}
                  </td>
                  <td className="border px-2 py-2">
                    <div className="flex space-x-2 justify-center">
                      <NavLink>
                        <FaEdit className="text-xl md:text-3xl text-blue-500 cursor-pointer" />
                      </NavLink>
                      <MdDelete className="text-xl md:text-3xl text-red-500 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center text-[#ff0000] text-2xl font-serif p-4"
                >
                  No products available or Token Problem
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(products.length / productsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-2 py-1 mb-5 text-sm md:px-4 md:py-2 md:text-base mx-1 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white hover:bg-orange-500"
                  : "bg-gray-200 hover:bg-orange-500"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AdminData;
