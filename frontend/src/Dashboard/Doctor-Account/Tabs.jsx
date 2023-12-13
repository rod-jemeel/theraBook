import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(AuthContext);
  const tabsRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const toggleTabs = () => tabsRef.current.classList.toggle("hidden");

  return (
    <div>
      <span className="lg:hidden" onClick={toggleTabs}>
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div
        ref={tabsRef}
        className="hidden lg:flex items-center shadow-panelShadow h-max p-[30px] bg-white flex-col rounded-md"
      >
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview"
              ? "bg-[#6505C4] text-white opacity-70"
              : "bg-transparent text-[#1C1C1C] opacity-70"
          } w-full btn rounded-md mt-0 transition duration-300 ease-in-out hover:text-white hover:opacity-80`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("appointments")}
          className={`${
            tab === "appointments"
              ? "bg-[#6505C4] text-white opacity-70"
              : "bg-transparent text-[#1C1C1C] opacity-70"
          } w-full btn rounded-md mt-0 transition duration-300 ease-in-out hover:text-white hover:opacity-80`}
        >
          Appointments
        </button>
        <button
          onClick={() => setTab("settings")}
          className={`${
            tab === "settings"
              ? "bg-[#6505C4] text-white  opacity-70"
              : "bg-transparent text-[#1C1C1C] opacity-70"
          } w-full btn rounded-md mt-0 transition duration-300 ease-in-out hover:text-white hover:opacity-80`}
        >
          Profile
        </button>
        <div className="mt-[100px] w-full">
          <button
            onClick={handleLogout}
            className="w-full bg-[#181A1E] p-3 rounded-md text-white text-[16px] leading-7 transition duration-300 ease-in-out hover:text-white hover:opacity-100"
          >
            Logout
          </button>
          <button className="w-full bg-red-600 mt-4 p-3 rounded-md text-white text-[16px] leading-7 transition duration-300 ease-in-out hover:text-white hover:opacity-100">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
