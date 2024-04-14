import React, { useState , useRef, useEffect} from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoMdMenu } from "react-icons/io";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="headerContainer">
      <p className="logo">
        <TiWeatherPartlySunny />
        Weather <span style={{ color: "#FFAF45" }}>Hub</span>
      </p>
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/weather">Climate Change</Link>
        </li>
        <li>
          <Link to="/Table">Weather Data</Link>
        </li>
      </ul>
      <div  ref={menuRef} className="mobileNavToggle">
          <IoMdMenu onClick={handleToggle}className="navToggleBtn"/>
{ isOpen && <ul className={`nav ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/weather">Climate Change</Link>
        </li>
        <li>
          <Link to="/Table">Weather Data</Link>
        </li>
        </ul>}
        
      </div>
    </div>
  );
};

export default Header;
