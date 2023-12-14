import { useState } from "react";
import logo from "../assets/images/icon2.png"
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../assets/images/signup.jpg";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import HashLoader from "react-spinners/HashLoader";

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "patient",
    photo: selectedFile,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async event => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setPreviewUrl(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (res.status === 400) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="flex relative p-0 top-0 left-0">
        <div className="w-1/2 relative overflow-hidden group">
          {/* Image Background */}
          <figure className="h-screen relative overflow-hidden">
            <img className="w-full h-full object-cover transition-all duration-300 ease-in-out transform scale-100 group-hover:scale-105" src={signupImg} alt="" />
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Second Image */}
                <img
                  src={logo}
                  alt="symbol"
                  className="max-w-[50%] max-h-[50%] mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:translate-x-0"
                />
              </div>
            </div>
          </figure>
        </div>





      <div className="w-1/2 pl-20 pr-20 pb-20 pt-10">
        {/* Registration Form */}
        <div className="max-w-[1170px] mx-auto">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Create a <span className="text-[#6505C4]">TheraBook Account</span>
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full pr-4 py-3 border-b border-solid border-[#9205C4] focus:outline-none focus:border-b-[#9205C4] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                name="email"
                placeholder="Enter Your Email"
                className="w-full pr-4 py-3 border-b border-solid border-[#9205C4] focus:outline-none focus:border-b-[#9205C4] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                name="password"
                placeholder="Password"
                className="w-full pr-4 py-3 border-b border-solid border-[#9205C4] focus:outline-none focus:border-b-[#9205C4] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                required
              />
            </div>
            <div className="mb-5">
              <div className="flex items-center justify-between mb-4">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  required
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Therapist</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7]">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="mb-5 flex items-center gap-3">
              {selectedFile && (
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-[#0067FF] flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full rounded-full"
                  />
                </figure>
              )}
              <div className="relative inline-block w-[130px] h-[50px]">
                <input
                  className="custom-file-input absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  id="customFile"
                  name="photo"
                  type="file"
                  accept=".jpg,.png"
                  placeholder="Upload Profile"
                  onChange={handleFileInputChange}
                />
                <label
                  className="absolute top-0 left-0 w-full h-full flex items-center px-[1.25rem] py-[0.375rem] text-[13px] leading-5 overflow-hidden border-[2px] bg-[transparent] text-[#1c1c1c] font-semibold rounded-lg truncate cursor-pointer hover:bg-[#f1f1f1] hover:border-none duration-300 ease-in-out"
                  htmlFor="customFile"
                >
                  {selectedFile ? selectedFile.name : "Upload Photo"}
                </label>
              </div>
            </div>
            <div className="mt-7">
              <button
                type="submit"
                disabled={loading && true}
                className="w-full bg-[#9205C4] text-white py-3 px-4 rounded-lg text-[18px] leading-[30px]"
              >
                {loading ? <HashLoader size={25} color="#fff" /> : "Sign Up"}
              </button>
            </div>
            <p className="mt-5 text-textColor text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-[#9205C4] font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
