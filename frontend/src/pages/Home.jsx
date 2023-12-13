import { Link } from "react-router-dom";
import heroImg01 from "../assets/images/icon.png"
import About from "../components/About/About.jsx";


const Home = () => {
  return (
    <>
      <section className="hero__section pt-[0px] pb-0 2xl:h-[800px] flex">
        {/* ========== Right side (text content) ========== */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between pl-[10px] pt-[60px] pb-[60px]">
            {/* ====== hero content ========== */}
            <div>
              <div className="lg:w-[570px] ml-10 text-white">
                <h1 className="text-headingColor text-[36px] leading-[46px] md:text-[60px] md:leading-[60px] font-[800]">
                  Embark on <p className="text-[#9205C4]">Healing</p> your New You!
                </h1>
                <p className="text__para">
                  Welcome to TheraBook your go-to destination for seamless therapy booking. Discover a simpler way to connect with skilled therapists and embark on your journey to well-being. With TheraBook, support is just a click away, making mental health care easy and accessible. Take the first step towards a happier, healthier you, explore TheraBook today.
                </p>
                <Link to="/doctors">
                  <button className="btn">Find a Therapist</button>
                </Link>
              </div>
            </div>
          </div>
        </div>


 {/* ========== Left side (background) ========== */}
  <div className="flex-1 group relative flex items-center justify-center overflow-hidden">
    {/* Background Image */}
    <div className="bg-cover w-full h-full bg-[url('./assets/images/left-bg.jpg')] transition-all duration-300 ease-in-out transform scale-100 group-hover:scale-105"></div>

    {/* Black Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-70 transition-opacity opacity-0 group-hover:opacity-100 duration-300 ease-in-out flex items-center justify-center">
      {/* Content in the left side (optional) */}
      <img src={heroImg01} alt="symbol" className="max-w-[50%] max-h-[50%] mx-auto" />
    </div>
  </div>
      </section>

      <About />
    </>
  );
};

export default Home;
