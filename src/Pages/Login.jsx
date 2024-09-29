import React, { useState } from 'react';
import backgroundImage from "../assets/asset50.jpeg";
import { FaUser } from 'react-icons/fa';
<<<<<<< HEAD
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
=======
import HomeFooter from '../Components/Footer2';
>>>>>>> 28e2dc80cd72811340d22d9283e4707c8e614441

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [passwordVisible, setPasswordVisible] = useState(false);
<<<<<<< HEAD
  const [isRegister, setIsRegister] = useState(false); 
  const [isAdminRegister, setIsAdminRegister] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
  });
  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [showSecretKeyPopup, setShowSecretKeyPopup] = useState(false);
=======
>>>>>>> 28e2dc80cd72811340d22d9283e4707c8e614441

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

<<<<<<< HEAD
  const toggleForm = () => {
    setIsRegister(!isRegister);
    resetForm();
  };

  const toggleAdminForm = () => {
    if (!isAdminRegister) {
      setShowSecretKeyPopup(true); // Show secret key popup
    } else {
      setIsAdminRegister(false);
      resetForm();
    }
  };

  const handleSecretKeySubmit = () => {
    // Check the secret key
    if (secretKey === 'vijay') { // Replace 'vijay' with your actual secret key
      setIsAdminRegister(true);
      setShowSecretKeyPopup(false);
      setSecretKey(''); // Reset secret key
    } else {
      setPopupMessage('Invalid Secret Key');
      setShowPopup(true);
      setSecretKey('');
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobileNo: '',
    });
    setErrors({});
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    // Validate form fields
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      let response;
      if (isRegister) {
        if (isAdminRegister) {
          response = await axios.post('http://localhost:1111/api/admin/register-admin', { 
            ...formData, 
            isAdmin: true 
          });
          setPopupMessage('Admin registered successfully!');
        } else {
          // User register API call
          response = await axios.post('http://localhost:1111/api/user/register-user', {
            ...formData, 
            isAdmin: false
          });
          setPopupMessage('User registered successfully!');
        }
      } else {
        // Login API call
        response = await axios.post('http://localhost:1111/api/user/login', {
          email: formData.email,
          password: formData.password
        });
        
        // Store the token in localStorage or any other storage as needed
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        console.log("Token ===>", token);

        setPopupMessage('User logged in successfully!');
        navigate('/DatabaseProduct'); 
      }
      setShowPopup(true);
      resetForm(); 
    } catch (error) {
      console.error('Error occurred:', error.response ? error.response.data : error.message);
      setPopupMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setShowPopup(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const formErrors = {};
    if (isRegister) {
      if (!formData.firstName) formErrors.firstName = 'First Name is required';
      if (!formData.lastName) formErrors.lastName = 'Last Name is required';
      if (!formData.gender) formErrors.gender = 'Gender is required';
      if (!formData.dateOfBirth) formErrors.dateOfBirth = 'Date of Birth is required';
      if (!formData.mobileNo) formErrors.mobileNo = 'Mobile Number is required';
    }

    if (!formData.email || !validateEmail(formData.email)) {
      formErrors.email = 'Valid Email is required';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    }

    if (isRegister && formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    return formErrors;
  };

  const closePopup = () => {
    setShowPopup(false);
  };

=======
>>>>>>> 28e2dc80cd72811340d22d9283e4707c8e614441
  return (
    <div className="relative">
      {/* Background Image Section */}
      <div className="relative w-full h-60 sm:h-80 md:h-[400px]">
        <img
          src={backgroundImage}
          alt="About Us Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">My Account</h1>
            <p className="text-sm md:text-base">
              <a href="#" className="text-black hover:text-red-500">Home</a>{" "}
              <span className="text-black">/</span>
              <span className="text-red-500">My Account</span>
            </p>
          </div>
        </div>
      </div>

      {/* Login Forms */}
      <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10 mt-10">
        {/* Login */}
        <div className="p-6 md:p-12 bg-white border border-gray-200 rounded-lg shadow-lg flex-1">
          <div className="flex items-center text-lg md:text-2xl gap-x-2 mb-6 underline">
            <FaUser />
            <h2 className="font-bold text-gray-800">Login</h2>
          </div>
          <form>
            <div className="mb-4">
              <label className="block mb-2 text-sm md:text-base text-gray-600">
                Username Or Email Address <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-3 py-2 md:py-3 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm md:text-base text-gray-600">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 md:py-3 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline"
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 text-gray-700 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.172.527-.376 1.032-.606 1.5M15 12a3 3 0 01-6 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="text-sm text-gray-700" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <a
                className="text-sm font-bold text-blue-500 hover:text-blue-800"
                href="#"
              >
                Lost Your Password?
              </a>
            </div>
            <button
              className="w-full px-4 py-2 font-bold text-white bg-black rounded-full hover:bg-red-500 transition duration-300 focus:outline-none focus:shadow-outline"
              type="button"
            >
              LOGIN
            </button>
          </form>
        </div>

<<<<<<< HEAD
        <form className="mt-4" onSubmit={onSubmitForm}>
          {/* Only email and password for login */} 
          {!isRegister && (
            <>
              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  type="email"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  type={passwordVisible ? 'text' : 'password'}
                  required
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={togglePasswordVisibility}
                  id="showPassword"
                />
                <label htmlFor="showPassword" className="text-sm text-gray-500">Show Password</label>
              </div>
            </>
          )}

          {/* Full registration form */} 
          {isRegister && (
            <>
              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  type="text"
                  required
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  type="text"
                  required
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                 
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                  type="date"
                  required
                />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.mobileNo ? 'border-red-500' : 'border-gray-300'}`}
                  type="text"
                  required
                />
                {errors.mobileNo && <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  type="email"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  type={passwordVisible ? 'text' : 'password'}
                  required
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  type={passwordVisible ? 'text' : 'password'}
                  required
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={togglePasswordVisibility}
                  id="showPasswordRegister"
                />
                <label htmlFor="showPasswordRegister" className="text-sm text-gray-500">Show Password</label>
              </div>
            </>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-600"
            >
              {isRegister ? 'Register' : 'Login'}
            </button>
          </div>
        </form>

        {/* Popup Message */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
              <p className="text-lg text-gray-700">{popupMessage}</p>
              <button
                onClick={closePopup}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Secret Key Popup */}
        {showSecretKeyPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm">
              <h2 className="text-xl text-gray-800 mb-4">Enter Secret Key</h2>
              <input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline mb-4"
                placeholder="Secret Key"
                required
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSecretKeySubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 mr-2"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowSecretKeyPopup(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
=======
        {/* Register */}
        <div className="p-6 md:p-12 bg-white border border-gray-200 rounded-lg shadow-lg flex-1">
          <div className="flex items-center text-lg md:text-2xl gap-x-2 mb-6 underline">
            <FaUser />
            <h2 className="font-bold text-gray-800">Register</h2>
          </div>
          <form>
            <div className="mb-4">
              <label className="block mb-2 text-sm md:text-base text-gray-600">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-3 py-2 md:py-3 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                required
              />
>>>>>>> 28e2dc80cd72811340d22d9283e4707c8e614441
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm md:text-base text-gray-600">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 md:py-3 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline"
                  id="registerPassword"
                  type={passwordVisible ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 text-gray-700 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.172.527-.376 1.032-.606 1.5M15 12a3 3 0 01-6 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-gray-400 rounded-full hover:bg-red-500 transition duration-300 focus:outline-none focus:shadow-outline"
              type="button"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>

      {/* Footer2 */}
      <HomeFooter />
    </div>
  );
}

export default Login;