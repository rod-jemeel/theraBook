import { useEffect, useState } from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import HashLoader from "react-spinners/HashLoader";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debouncedQuery}`);

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    // Debounce the query value after 500ms of inactivity
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700);

    // Clean up the timeout
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <>
      <section className="bg-[#f2f2f2]">
        <div className="container text-center">
          <h2 className="heading">Need a <span className="text-[#9205C4]">Therapist</span>? Find one</h2>
          <div className="max-w-[570px] mx-auto mt-[30px] bg-[#e3e3e3] rounded-md flex items-center justify-between ">
            <input
              className="py-4 pl-4 pr-2 text-[14px] focus:outline-none cursor-text w-full bg-transparent placeholder:text-textColor"
              type="search"
              placeholder="Search by therapist or specialization..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button
              className="btn text-[14px] mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && (
            <div className="flex items-center justify-center w-full h-full">
              <HashLoader color="#0067FF" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 z-10">
              {doctors?.map(doctor => (
                <DoctorCard doctor={doctor} key={doctor.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
