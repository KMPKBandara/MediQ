/*import React, { useEffect, useRef, useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

  return (
    <header className="header flex item-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          
          <div>
            <img src={logo} alt="" />
          </div>

          
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex item-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                    <img
                      src={user?.photo}
                      className="w-full rounded-full"
                      alt="user-image"
                    />
                  </figure>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
*/
import React, { useEffect, useRef, useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

  const handleLoginClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/login");
    }, 1000); // simulate loading for 1 second
  };

  return (
    <header className="header flex item-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/*===== Logo =====*/}
          <div>
            <img src={logo} alt="logo" />
          </div>

          {/*===== Menu =====*/}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex item-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/*===== Nav Right =====*/}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }
                >
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                    <img
                      src={user?.photo}
                      className="w-full rounded-full"
                      alt="user"
                    />
                  </figure>
                </Link>
              </div>
            ) : (
              <button
                className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
                onClick={handleLoginClick}
                disabled={loading}
              >
                {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
              </button>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
