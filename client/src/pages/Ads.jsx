import { Button, Label, Select, Spinner, TextInput } from "flowbite-react";
// import { RiColorFilterFill } from "react-icons/ri";
import JobCard from "../components/JobCard";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const res = await fetch("/api/v1/products/get-all-products");
        const data = await res.json();
        if (data.success === false) {
          console.error("Failed to fetch ads:", data.message);
          return;
        }
        if (res.ok) {
          const filteredAds = data.filter((ad) => ad.type === "Ads");
          setAds(filteredAds);
        }
      } catch (error) {
        console.log("Error fetching ads:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdsData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      const filteredSerach = ads.filter((ad) => {
        return (
          ad.title.toLowerCase().includes(searchTerm.toLowerCase()),
          ad.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      if (filteredSerach.length === 0) {
        toast.error("No products found for this search, please try again!");
        return;
      }
      setAds(filteredSerach);
      setSearchTerm("");
    } catch (error) {
      console.log("Error searching ads:", error.message);
    }
  };
  return (
    <div className="mt-10 min-h-screen">
      <div className=" p-4 max-w-7xl mx-auto ">
        {/* Header Part start Here */}
        <div className="flex  flex-col items-center justify-center  gap-10">
          <h1 className="text-5xl sm:text-6xl text-cyan-800 font-semibold font-mono">
            Falcon Ads
          </h1>
          <div className="flex p-3 w-fit border border-blue-500 rounded-lg flex-1 items-center justify-between gap-2">
            <form onSubmit={handleSearch} className="flex items-center gap-1">
              <TextInput
                placeholder="Type here for search..."
                className="w-[250px] sm:w-[500px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
        </div>
        {/* Header Part End Here */}
        <div className="mt-10">
          <div className="flex flex-col md:flex-row">
            {/* Left Side Part Start Here */}
            {/* <div className="p-7 sm:w-[400px] border-b border-b-gray-400 sm:border-b-0 sm:border-r-[1px] md:border-r-gray-300 ">
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
            </div> */}
            {/* Left Side Part End Here */}
            {/* Right Part Start Here */}
            <div className="sm:p-7 flex-1 mt-5 sm:mt-0">
              <div className="flex items-center justify-between border-b pb-3">
                <p className="text-gray-600 font-semibold">
                  Showing:{" "}
                  <span className="font-normal text-sm md:text-md text-blue-600">
                    {" "}
                    {ads.length} Filtered {ads.length > 1 ? "Jobs" : "Job"}
                  </span>
                </p>
                <div className="flex items-center gap-1">
                  <Label
                    value="Sort By :"
                    className="font-semibold text-gray-600  text-sm md:text-lg"
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
                  {isLoading && (
                    <div className="flex items-center justify-center mx-auto text-gray-600 text-xl my-10">
                      <Spinner size="xl" color="failure" />
                    </div>
                  )}
                  {!isLoading && ads.length === 0 && (
                    <div className="flex items-center justify-center mx-auto font-semibold text-red-600 text-3xl my-10 animate-bounce">
                      No ADS Found.
                    </div>
                  )}
                  {ads &&
                    ads.length > 0 &&
                    ads.map((item) => <JobCard key={item._id} item={item} />)}
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
