const WhyChooseUs = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-5xl sm:text-6xl font-mono -tracking-[3px] text-cyan-800 font-bold text-center mb-10 ">
        Why Choose Us
      </h1>
      <div className="flex flex-col gap-10 p-2 sm:flex-row items-center justify-between my-5">
        <div className=" flex-1  flex flex-col justify-center gap-2">
          <img
            src="/choose-image.webp"
            alt="choose-us-image"
            className="w-full h-full rounded-tl-lg rounded-tr-lg"
          />
          <p className="text-sm mt-2 text-center sm:text-md p-2 sm:px-0 text-gray-500 border border-gray-300 bg-gray-200 rounded-br-full rounded-bl-full">
            Partnership with{" "}
            <span className="font-medium text-purple-700">Glassdoor</span> and{" "}
            <span className="font-medium text-sky-600">LinkedIn</span>
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-2 items-center">
          <h3 className="text-[30px] sm:text-4xl font-[700] -tracking-[2px]">
            Build a custom membership site with locked content.
          </h3>
          <p className="text-md sm:text-lg p-2 sm:px-0 text-gray-500 font-[400]">
            Your trusted partner for innovative solutions and exceptional
            service,Experience the difference: Personalized care, expert
            knowledge, and passion-driven results.
          </p>
          <div className="flex flex-col gap-4 mt-5">
            <div className="p-3 bg-gray-200 shadow-sm rounded-lg border-b flex items-center justify-between border-blue-800">
              <div className="flex items-center gap-4">
                <img
                  src="/Two-user.svg"
                  alt="imag-card"
                  className="w-10 h-10 overflow-hidden object-cover rounded bg-white"
                />
                <div className="flex flex-col flex-1 gap-2">
                  <p className="font-medium capitalize text-gray-900">
                    Add a feature point here
                  </p>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-gray-200 shadow-sm rounded-lg border-b flex items-center justify-between border-blue-800">
              <div className="flex items-center gap-4">
                <img
                  src="/Two-user.svg"
                  alt="imag-card"
                  className="w-10 h-10 overflow-hidden object-cover rounded bg-white"
                />
                <div className="flex flex-col flex-1 gap-2">
                  <p className="font-medium capitalize text-gray-900">
                    Add a feature point here
                  </p>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-gray-200 shadow-sm rounded-lg border-b flex  items-center justify-between border-blue-800">
              <div className="flex items-center gap-4">
                <img
                  src="/Two-user.svg"
                  alt="imag-card"
                  className="w-10 h-10 overflow-hidden object-cover rounded bg-white"
                />
                <div className="flex flex-col flex-1 gap-2">
                  <p className="font-medium capitalize text-gray-900">
                    Add a feature point here
                  </p>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-gray-200 shadow-sm rounded-lg border-b flex  items-center justify-between border-blue-800">
              <div className="flex items-center gap-4 ">
                <img
                  src="/Two-user.svg"
                  alt="imag-card"
                  className="w-10 h-10 overflow-hidden object-cover rounded bg-white"
                />
                <div className="flex flex-col flex-1 gap-2">
                  <p className="font-medium capitalize text-gray-900">
                    Add a feature point here
                  </p>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
