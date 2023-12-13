import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="flex pt-[0px] pb-0 ">
      {/* Left Side */}
      <div className="w-1/2">
        <div className=" bg-cover w-full h-full bg-[url('./assets/images/right-bg.jpg')] ">
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center  bg-[#0d0d0d]">
        <div className="w-full lg:w-[770px] mx-auto justify p-[5rem] ">
          <h2 className="heading font-extrabold text-[#f9f9f9]">What Exactly is <span className="text-[#9205C4] break-none">Therabook</span></h2>
          <p className="text__para text-[#f9f9f9]">
            <b>Therabook</b> is an innovative platform designed to streamline the process of connecting clients or patients with therapists, offering a convenient and efficient solution for scheduling appointments. By utilizing Therabook, individuals seeking therapeutic support can easily find and book sessions with qualified therapists, enhancing accessibility to mental health services.
          </p>
          <p className="text__para mt-[30px] text-[#f9f9f9]">
            This platform not only facilitates the matchmaking between clients and therapists but also serves as a crucial component for our project CCS6, where it fulfills specific requirements to ensure the seamless execution and success of our broader initiatives. Therabook is not just a booking tool; it is a transformative resource that contributes to the accessibility and effectiveness of mental health care.
          </p>
          <Link to="/contact">
            <button className="btn">Contact us</button>
          </Link>
        </div>
      </div>
    </section>

  );
};

export default About;
