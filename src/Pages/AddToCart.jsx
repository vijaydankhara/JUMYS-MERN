import React, { useState, useEffect } from "react";
import axios from "axios";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);

  console.log('allProductCart' , cartItems);

  // Fetch data from the backend using axios
  useEffect(() => {
    axios
      .get('http://localhost:1111/api/user/cart/get-All-Carts')
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Ensure we handle cases where price might be missing or invalid
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price ? item.price * item.quantity : 0),
    0
  );

  return (
    <div className="flex justify-between w-full p-6">
      {/* Product Table */}
      <div className="w-3/5">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b py-4"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover mr-4"
              />
              <p className="text-lg font-semibold">{item._id}</p>
            </div>
            <div className="text-lg font-medium">
              ${item.price ? item.price.toFixed(2) : "0.00"}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                +
              </button>
            </div>
            <div className="text-lg font-medium">
              ${(item.price ? (item.price * item.quantity).toFixed(2) : "0.00")}
            </div>
            <button
              className="text-red-500 hover:text-red-600"
              onClick={() => handleRemove(item.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AddToCart;
