import React, { useState } from "react";
import Weblogo from "../assets/asset0.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FaGripVertical } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import IconBar from "./icone";
import "./Navbar.css";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState({
    mobile: false,
    home: false,
    shop: false,
    products: false,
    blog: false,
    page: false,
    admin: false,
  });
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setActiveMenu((prevMenu) => ({
      ...prevMenu,
      [menu]: !prevMenu[menu],
    }));
  };

  const closeAllMenus = () => {
    setActiveMenu({
      mobile: false,
      home: false,
      shop: false,
      products: false,
      blog: false,
      page: false,
      admin: false,
    });
  };

  return (
    <>
      <div className="bg-[#fff] w-full h-28 flex justify-around items-center z-50 sticky top-0">
        <div className="container">
          <div className="flex items-center justify-between ml-5">
            <div className="" id="toggelmenuTop">
              <button
                onClick={() => toggleMenu("mobile")}
                className="text-gray-950"
              >
                ☰
              </button>
            </div>
            <button
              className="flex items-center rtl:space-x-reverse"
              onClick={() => navigate("/")}
            >
              <img
                id="logo"
                className="size-24"
                src={Weblogo}
                alt="Not Found"
              />
            </button>
            <div className="hidden md:flex space-x-16" id="toggle">
              {/* Home menu */}
              <div
                className="relative"
                onMouseEnter={() => toggleMenu("home")}
                onMouseLeave={() => toggleMenu("home")}
              >
                <button className="NavbatTxt" onClick={() => navigate("/")}>
                  Home
                </button>
              </div>

              {/* Shop menu */}
              <div
                className="relative"
                onMouseEnter={() => toggleMenu("shop")}
                onMouseLeave={() => toggleMenu("shop")}
              >
                <button className="NavbatTxt">Shop &#11163;</button>
                {activeMenu.shop && (
                  <ul className="absolute left-0 w-48 bg-white text-[#000000] shadow-lg rounded-md overflow-hidden">
                    <li>
                      <NavLink
                        to="/shopList"
                        className="shop"
                        onClick={closeAllMenus}
                      >
                        Shop List
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/databaseProduct"
                        className="shop"
                        onClick={closeAllMenus}
                      >
                        Fav Product
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/wishlist"
                        className="page"
                        onClick={closeAllMenus}
                      >
                        Wishlist
                      </NavLink>
                    </li>
                  </ul>
                )}
              </div>

              {/* Products menu */}
              <div
                className="relative"
                onMouseEnter={() => toggleMenu("products")}
                onMouseLeave={() => toggleMenu("products")}
              >
                <button
                  className="NavbatTxt"
                  onClick={() => navigate("/product")}
                >
                  Products
                </button>
              </div>

              {/* Blog menu */}
              <div
                className="relative"
                onMouseEnter={() => toggleMenu("blog")}
                onMouseLeave={() => toggleMenu("blog")}
              >
                <button className="NavbatTxt" onClick={() => navigate("/blog")}>
                  Blog
                </button>
              </div>

              {/* Page menu */}
              <div
                className="relative"
                onMouseEnter={() => toggleMenu("page")}
                onMouseLeave={() => toggleMenu("page")}
              >
                <button className="NavbatTxt">Page &#11163;</button>
                {activeMenu.page && (
                  <ul className="absolute left-0 w-48 bg-white text-[#000000] shadow-lg rounded-md overflow-hidden">
                    <li>
                      <NavLink
                        to="/aboutUs"
                        className="page"
                        onClick={closeAllMenus}
                      >
                        About Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contact"
                        className="page"
                        onClick={closeAllMenus}
                      >
                        Contact
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/faq2"
                        className="page"
                        onClick={closeAllMenus}
                      >
                        Faq 2
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/page404"
                        className="page"
                        onClick={closeAllMenus}
                      >
                        Page 404
                      </NavLink>
                    </li>
                  </ul>
                )}
              </div>

              {/* Admin menu */}
              <div
                className="relative"
                onMouseEnter={() => toggleMenu("admin")}
                onMouseLeave={() => toggleMenu("admin")}
              >
                <button className="NavbatTxt">Admin &#11163;</button>
                {activeMenu.admin && (
                  <ul className="absolute left-0 w-48 bg-white text-[#000000] shadow-lg rounded-md overflow-hidden">
                    <li>
                      <NavLink
                        to="/admindata"
                        className="page"
                        onClick={closeAllMenus}
                      >
                        AdminData
                      </NavLink>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Icons bar */}
            <div className="flex justify-between items-center">
              <IconBar />
            </div>
          </div>

          {/* Mobile menu */}
          {activeMenu.mobile && (
            <ul
              id="toggelmenuTop"
              className="bg-[#ffffff] text-black text-xl font-bold space-y-4 py-4 px-4 w-full"
            >
              <li>
                <NavLink to="/" onClick={closeAllMenus}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" onClick={closeAllMenus}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/product" onClick={closeAllMenus}>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" onClick={closeAllMenus}>
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/page" onClick={closeAllMenus}>
                  Page
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Bottom navigation for mobile */}
        <div
          className="w-full justify-evenly flex fixed bg-white h-16 bottom-0"
          id="toggelHiden"
        >
          <NavLink
            to="/shopList"
            className="w-24 h-full flex flex-col justify-center items-center"
          >
            <FaGripVertical className="iconeNav" />
            Shop
          </NavLink>

          <NavLink
            to="/addtocart"
            className="w-24 h-full flex flex-col justify-center items-center"
          >
            <FontAwesomeIcon icon={faShoppingBasket} className="iconeNav" />
            Cart
          </NavLink>

          <NavLink
            to="/login"
            className="w-24 h-full flex flex-col justify-center items-center"
          >
            <FontAwesomeIcon icon={faRightToBracket} className="iconeNav" />
            Login
          </NavLink>

          <NavLink
            to="/addtowishlist"
            className="w-24 h-full flex flex-col justify-center items-center"
          >
            <FontAwesomeIcon icon={faHeart} className="iconeNav" />
            Wishlist
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
