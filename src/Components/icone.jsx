import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faHeart, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Login from "../Pages/Login";

const IconBars = () => {
  return (
    <div className="flex items-center space-x-6 mr-5">
      <div className="relative" id="icon1">
        <FontAwesomeIcon icon={faSearch} className="iconeNav" />
      </div>

      <NavLink to="/login" className="relative" id="icon1">
        <FontAwesomeIcon icon={faRightToBracket} className="iconeNav" />
      </NavLink>

      <NavLink to="/addtowishlist" className="relative" id="icon1">
        <FontAwesomeIcon icon={faHeart} className="iconeNav" />
      </NavLink>

      <NavLink to="/addtocart" className="relative" id="icon1">
        <FontAwesomeIcon icon={faShoppingBasket} className="iconeNav" />
      </NavLink>


      
     

      
    </div>
  );
};

export default IconBars;
