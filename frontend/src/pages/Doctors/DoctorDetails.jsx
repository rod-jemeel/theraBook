import { useState } from "react";
// import doctorImg from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();

  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/therapists/${id}`);

  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    photo,
  } = doctor;

  return (
    <section>
      <div className="max-w-[1170px] px-[20px] mx-auto">
        {loading && (
          <div className="flex items-center justify-center w-full h-full">
            <HashLoader color="#9205C4" />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center w-full h-full">
            <h3 className="text-headingColor text-[20px] font-semibold leading-[30px]">
              {error}
            </h3>
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex gap-5 items-center">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={photo} alt="" className="w-full rounded-[15px] pr-1" />
                </figure>
                <div>
                  <span className="bg-[#F485FF] bg-opacity-60 text-[#9205C4]  py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-[600]">
                    {specialization}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-[36px] mt-3 font-bold">
                    {name}
                  </h3>
                  <p className="text__para text-[14px] md:text-[15px] leading-6 lg:max-w-[390px]">
                    {bio}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#9205C4]">
                <div>
                  <button
                    onClick={() => setTab("about")}
                    className={`${
                      tab === "about" &&
                      "border-b border-solid border-[#9205C4]"
                    }  p-2 mr-5 px-5  text-headingColor font-semibold text-[16px] leading-7  `}
                  >
                    Details
                  </button>

                </div>
              </div>

              <div className="mt-[50px]">
                {tab === "about" && (
                  <div>
                    <DoctorAbout
                      name={name}
                      about={about}
                      qualifications={qualifications}
                      experiences={experiences}
                    />
                  </div>
                )}
                {tab === "feedback" && (
                  <div>
                    <Feedback reviews={reviews} totalRating={totalRating} />
                  </div>
                )}
              </div>
            </div>
            <div>
              <SidePanel
                doctorId={doctor._id}
                ticketPrice={ticketPrice}
                timeSlots={timeSlots}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails;
