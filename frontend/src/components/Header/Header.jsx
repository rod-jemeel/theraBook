import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useContext, useEffect, useRef } from "react";

import { AuthContext } from "./../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Therapist",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const { user, token, role } = useContext(AuthContext);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header ref={headerRef} className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* =========== logo ========== */}
          <div>
            <img src={logo} alt="logo" className="logosize"/>
          </div>

       {/* ========== nav menu =========== */}
<div className="navigation relative" ref={menuRef} onClick={toggleMenu}>
  <ul className="menu flex items-center gap-[2.7rem]">
    {navLinks.map((link, index) => (
      <li key={index} className="relative">
        <NavLink
          to={link.path}
          className={navClass =>
            navClass.isActive
              ? "text-[#6505C4] font-[600] text-[14px] leading-7 relative group"
              : "text-textColor font-[500] text-[14px] leading-7 relative group"
          }
        >
          {link.display}
          <span className="absolute left-0 bottom-0 w-full h-[1px] top-6 bg-[#6505C4] opacity-20 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-hover:transition-transform"></span>
        </NavLink>
      </li>
    ))}
  </ul>
</div>

          {/* ========= nav right ========== */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  } `}
                >
                  <figure className="relative w-[35px] h-[35px] rounded-full cursor-pointer overflow-hidden group">
                    <img
                      className="w-full h-full rounded-full transition-transform transform group-hover:scale-110"
                      src={user?.photo}
                      alt=""
                    />
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </figure>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn m-0 bg-[#1c1c1c] py-1 px-6 rounded-[5px] text-white font-[300] h-[36px] flex items-center justify-center hover:bg-[#2b2b2b] text-[14px]">
                  Login
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
