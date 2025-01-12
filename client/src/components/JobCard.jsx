import { FaLocationDot } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import moment from "moment";

const JobCard = ({ item }) => {
  return (
    <div className=" w-full mt-2 border-2 border-gray-300 bg-gray-100 overflow-hidden rounded-lg sm:w-[380px] transition-all duration-300">
      <div className="flex flex-col gap-4 p-4 w-full h-[450px]">
        <img
          src={item.image}
          alt="job-image"
          className="object-cover overflow-hidden rounded w-full h-full"
        />

        <div className="flex flex-col gap-2">
          <h2 className="text-xl truncate text-start font-medium text-gray-800">
            {item.description}
          </h2>
          <h3 className="text-start border w-fit px-2 py-1 rounded bg-gray-300 font-semibold">
            {item.title}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <p
            className={`flex items-center gap-1 ${
              item.location ? "text-gray-900" : "text-red-600"
            }`}
          >
            <FaLocationDot
              className={`${item.location ? "text-green-600" : "text-red-600"}`}
            />
            {item.location ? item.location : "---"}
          </p>
          <p className={`flex items-center gap-1`}>
            <GiMoneyStack className={`text-green-600  size-5`} />
            {item.price} SAR
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            className={`flex items-center gap-1 ${
              item.phoneNumberItem ? "text-gray-900" : "text-red-600"
            }`}
          >
            <FaPhoneAlt
              className={`${
                item.phoneNumberItem ? "text-green-600" : "text-red-600"
              }`}
            />
            {item.phoneNumberItem ? item.phoneNumberItem : "---"}
          </p>
          <p className="flex items-center gap-1">
            <MdOutlineDateRange className="text-green-600" />
            {moment(item.createdAt).format("YYYY-MM-DD")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
