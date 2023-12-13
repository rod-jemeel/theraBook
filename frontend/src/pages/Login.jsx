import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import logo from "../assets/images/logo1.png"
import logo1 from "../assets/images/logo.png"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      setLoading(false);
      toast.success(result.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 md:px-0 pt-9">
      <div className="flex w-full max-w-[800px] mx-auto rounded-lg shadow-lg overflow-hidden">
        {/* Left Side (Background) */}
        <div className="w-5/10 bg-[#6505C4] px-10 flex-shrink-0 flex items-center justify-center">
          <h3 className="text-white text-[28px] leading-9 font-bold">
            Welcome to TheraBook  <p className="text-[10px] font-thin leading-[20px] text-center">Copyright © 2023 developed by CFN all rights reserved.</p>
          </h3>
        </div>

        {/* Right Side (Form) */}
        <div className="w-5/10 p-10 flex flex-col justify-center text-center">
          <img src={logo} alt="" className="max-w-[40%] max-h-[30%] mx-auto mt-auto mb-5" />

          <form onSubmit={handleSubmit} className="py-8 md:py-4 md:px-[1rem] ">
                <div className="mb-6">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2 border-b border-solid border-[#9205C4] focus:outline-none text-[13px] leading-7 text-headingColor placeholder:text-textColor"
                    required
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border-b border-solid border-[#9205C4] focus:outline-none text-[13px] leading-7 text-headingColor placeholder:text-textColor"
                    required
                  />
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading && true}
                    className="btn hover:bg-[#2b2b2b] bg-[#1c1c1c] w-full text-white mt-0 py-2 px-4 rounded-lg text-[15px] leading-[36px]"
                  >
                    {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
                  </button>
                </div>

                <p className="mt-6 text-textColor text-center text-[13px] leading-6">
                  Don&apos;t have an account?
                  <Link to="/register" className="text-[#9205C4] font-medium ml-1">
                    Register
                  </Link>
                </p>
              </form>
            </div>
      </div>
</section>

  );
};

export default Login;
