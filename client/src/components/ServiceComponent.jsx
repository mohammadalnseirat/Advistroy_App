import { Button } from "flowbite-react";

const ServiceComponent = ({ service }) => {
  return (
    <div className="w-full  bg-[#010852] text-gray-50 shadow-sm border-2 border-cyan-800 h-[400px] overflow-hidden mx-auto sm:w-[350px] rounded-lg ">
      <div className="w-full h-full flex flex-col gap-4 items-center justify-between p-4">
        <div className="flex flex-col gap-4 items-center">
          <img
            src={service.img}
            alt="img-service"
            className="rounded-lg object-cover w-20 h-20 animate-pulse"
          />
          <p className=" text-right text-gray-300 font-medium text-lg leading-7">
            {service.desc}
          </p>
        </div>
        <Button gradientMonochrome="purple">{service.title}</Button>
      </div>
    </div>
  );
};

export default ServiceComponent;
