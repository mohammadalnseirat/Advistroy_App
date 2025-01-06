import { Button, Label, Select, TextInput } from "flowbite-react";
import { RiColorFilterFill } from "react-icons/ri";
import { jobs } from "../utils/constant";
import JobCard from "../components/JobCard";

const Ads = () => {
  return (
    <div className="mt-10 min-h-screen">
      <div className=" p-4 max-w-7xl mx-auto ">
        {/* Header Part start Here */}
        <div className="flex  flex-col items-center justify-center  gap-10">
          <h1 className="text-5xl sm:text-6xl text-cyan-800 font-semibold font-mono">
            Falcon Ads
          </h1>
          <div className="flex p-3 w-fit border border-blue-500 rounded-lg flex-1 items-center justify-between gap-2">
            <TextInput
              placeholder="Type here for search..."
              className="w-[250px] sm:w-[500px]"
            />
            <Button>Search</Button>
          </div>
        </div>
        {/* Header Part End Here */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row">
            {/* Left Side Part Start Here */}
            <div className="p-7 sm:w-[400px] border-b border-b-gray-400 sm:border-b-0 sm:border-r-[1px] md:border-r-gray-300 ">
              <div className="flex flex-col  gap-6 w-full">
                <p className="flex items-center gap-6 text-blue-600 text-xl font-semibold">
                  <RiColorFilterFill className="text-red-600 size-5" />
                  Filter
                </p>
                <form className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <Label
                      value="Services :"
                      className="font-semibold whitespace-nowrap text-gray-600 text-lg"
                    />
                    <Select className="w-[200px]">
                      <option value="all">All</option>
                      <option value="service1">Service 1</option>
                      <option value="service2">Service 2</option>
                      <option value="service3">Service 3</option>
                      <option value="service4">Service 4</option>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <Label
                      value="Categories :"
                      className="font-semibold whitespace-nowrap text-gray-600 text-lg"
                    />
                    <Select className="w-[200px]">
                      <option value="all">All</option>
                      <option value="service1">Category 1</option>
                      <option value="service2">Category 2</option>
                      <option value="service3">Category3</option>
                      <option value="service4">Category 4</option>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <Label
                      value="Types :"
                      className="font-semibold whitespace-nowrap text-gray-600 text-lg"
                    />
                    <Select className="w-[200px]">
                      <option value="all">All</option>
                      <option value="service1">Electronic </option>
                      <option value="service2">Real Estate </option>
                      <option value="service3">Marketing</option>
                    </Select>
                  </div>
                  <Button color="purple">Search</Button>
                </form>
              </div>
              <div className="mt-10 hidden md:block">
                <img src="/image-ads.png" alt="image-ads" />
              </div>
            </div>
            {/* Left Side Part End Here */}
            {/* Right Part Start Here */}
            <div className="sm:p-7 flex-1 mt-5 sm:mt-0">
              <div className="flex items-center justify-between border-b pb-3">
                <p className="text-gray-600 font-semibold">
                  Showing:{" "}
                  <span className="font-normal text-blue-600">
                    {" "}
                    600 filtered jobs
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <Label
                    value="Sort By :"
                    className="font-semibold text-gray-600 text-lg"
                  />
                  <Select className="text-blue-600">
                    <option className="text-blue-600" value="relevance">
                      Relevance
                    </option>
                    <option className="text-blue-600" value="mostRecent">
                      Most Recent
                    </option>
                    <option className="text-blue-600" value="salary">
                      Salary
                    </option>
                  </Select>
                </div>
              </div>
              {/* Card Part Start Here */}
              <div className="mt-5">
                <div className="flex flex-wrap gap-5">
                  {jobs.map((job) => (
                    <JobCard job={job} key={job.id} />
                  ))}
                </div>
              </div>

              {/* Card Part End Here */}
            </div>
            {/* Right Part End Here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ads;
