import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartLogoDark from "../assets/CartLogoDark.png";
import CartLogoWhite from "../assets/CartLogoWhite.png";
import DarkMode from "../assets/DarkMode.png";
import LightMode from "../assets/LightMode.png";
import Search from "../assets/Search.png";

const NavBar = () => {
  const [theme, setTheme] = useState("light");
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  const changeMode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    const navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("dark-mode");
  };

  return (
    <nav className="nav-bar">
      <Link to={"/"}>
        <img
          src={theme === "light" ? CartLogoDark : CartLogoWhite}
          alt="logo"
          className="logo"
        />
      </Link>

      <div className="nav-routes">
        <span className="home-route">Home</span>
        <span className="product-route">Product</span>
        <span className="about-route">About</span>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img src={Search} alt="search-icon" />
      </div>

      <img
        onClick={changeMode}
        src={theme === "light" ? DarkMode : LightMode}
        alt="theme-icon"
        className="mode-icon"
      />

      <Link to={"/cart"}>
        <div className="nav-cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill={theme === "light" ? "black" : "#f4dfc8"}
            className="bi bi-cart3"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          <span className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>
    </nav>
  );
};
export default NavBar;
