import { FaLocationDot } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

const JobCard = ({ job }) => {
  return (
    <div className=" w-full border-2 border-gray-300  h-auto overflow-hidden rounded-lg sm:w-[350px] transition-all duration-300">
      <div className="flex flex-col gap-2 p-4 bg-gray-100">
        <img
          src={job.image}
          alt="job-image"
          className="object-cover overflow-hidden rounded"
        />

        <h2 className="text-xl text-center font-semibold text-gray-800">
          {job.jobTitle}
        </h2>
        <h3 className="text-start border w-fit px-2 py-1 rounded bg-gray-300 font-semibold">
          {job.jobCategory}
        </h3>
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1">
            <FaLocationDot className="text-green-600" />
            {job.location}
          </p>
          <p className="flex items-center gap-1">
            <GiMoneyStack className="text-green-600 size-5" />
            {job.salary}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1">
            <FaPhoneAlt className="text-green-600" />
            {job.phoneNumber}
          </p>
          <p className="flex items-center gap-1">
            <MdOutlineDateRange className="text-green-600" />
            {job.applicationDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
