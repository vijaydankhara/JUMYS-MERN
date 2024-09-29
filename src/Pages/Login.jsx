import React, { useState } from 'react';
import backgroundImage from '../assets/b.jpg'; // Ensure this path is correct
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [passwordVisible, setPasswordVisible] = useState(false);
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
    if (secretKey === 'vijay') { 
      setIsAdminRegister(true);
      setShowSecretKeyPopup(false);
      setSecretKey(''); // Reset secret key
      setIsRegister(true); // Switch to registration mode
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
        response = await axios.post('http://localhost:1111/api/admin/login', {
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

  return (
<div className="container mx-auto p-4 bg-cover bg-center h-full" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center text-2xl mb-6">
          <FaUser className="mr-2" />
          <h2>{isRegister ? (isAdminRegister ? 'Admin Registration' : 'User Registration') : 'Login'}</h2>
        </div>

        <form onSubmit={onSubmitForm}>
          {isRegister && (
            <>
              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-500">First Name <span className="text-red-500">*</span></label>
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
                <label className="block mb-2 text-sm text-gray-500">Last Name <span className="text-red-500">*</span></label>
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
                <label className="block mb-2 text-sm text-gray-500">Gender <span className="text-red-500">*</span></label>
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
                <label className="block mb-2 text-sm text-gray-500">Date of Birth <span className="text-red-500">*</span></label>
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
                <label className="block mb-2 text-sm text-gray-500">Mobile Number <span className="text-red-500">*</span></label>
                <input
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded-full focus:outline-none focus:shadow-outline ${errors.mobileNo ? 'border-red-500' : 'border-gray-300'}`}
                  type="tel"
                  required
                />
                {errors.mobileNo && <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>}
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-500">Email <span className="text-red-500">*</span></label>
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
            <label className="block mb-2 text-sm text-gray-500">Password <span className="text-red-500">*</span></label>
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

          {isRegister && (
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-500">Confirm Password <span className="text-red-500">*</span></label>
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
          )}

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={passwordVisible}
              onChange={togglePasswordVisibility}
              className="mr-2"
            />
            <label className="text-sm text-gray-500">Show Password</label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            {isRegister ? (isAdminRegister ? 'Register Admin' : 'Register User') : 'Login'}
          </button>
        </form>

        <div className="flex justify-between mt-4">
          <button onClick={toggleForm} className="text-blue-500 hover:underline">
            {isRegister ? 'Already have an account? Login' : 'Register as User'}
          </button>
          <button onClick={toggleAdminForm} className="text-[#269213] hover:underline">
            {isAdminRegister ? 'Cancel Admin Registration' : 'Register as Admin'}
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>{popupMessage}</p>
            <button onClick={closePopup} className="mt-2 text-blue-500 hover:underline">
              Close
            </button>
          </div>
        </div>
      )}

      {showSecretKeyPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#6fff79] p-4 rounded shadow-lg">
            <label className="block mb-2 text-sm text-gray-500">Enter Secret Key:</label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={handleSecretKeySubmit}
              className="mt-2 w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <button onClick={() => setShowSecretKeyPopup(false)} className="mt-2 text-black hover:underline">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
