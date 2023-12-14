import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const {
    name,
    averageRating,
    totalRating,
    // totalPatients,
    specialization,
    photo,
    experiences,
  } = doctor;

  return (
    <Link to={`/therapists/${doctor._id}`} className="relative group">
      <div className="relative z-0 p-3 lg:p-8 border-[2px] bg-[white] rounded-[15px] transition-transform duration-300 ease-in-out transform hover:scale-[120%] hover:z-10 hover:shadow-xl hover:translate-y-1">
        <div>
          <img className="w-full rounded-[15px]" src={photo} alt="" />
        </div>
        <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 font-[700] text-headingColor mt-3 lg:mt-5">
          {name}
        </h2>
        <div className="mt-2 lg:mt-4 flex items-center justify-between">

        <span className={`bg-[#9205C4]  text-[white] py-1 px-4 lg:py-2 lg:px-6 rounded text-[10px] lg:text-[14px] font-[600] ${specialization.length > 1 ? 'whitespace-nowrap' : 'whitespace-normal'}`}>
          {specialization}
        </span>
        </div>

        <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
          <div>

            <p className="text-[14px] leading-[24px] font-[400] text-textColor">
              At {experiences[0].hospital}
            </p>
          </div>
        </div>
      </div>
  </Link>
  );
};

export default DoctorCard;
