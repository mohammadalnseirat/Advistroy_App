import { Link } from "react-router-dom";
import { services } from "../utils/constant";
import ServiceComponent from "../components/ServiceComponent";
import WhyChooseUs from "../components/WhyChooseUs";
import { useEffect, useState } from "react";
import { Carousel, Spinner } from "flowbite-react";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //? UseEffect To Get All Products:
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/v1/products/get-all-products");
        const data = await res.json();
        if (data.success === false) {
          console.error("Failed to fetch products:", data.message);
          return;
        }
        if (res.ok) {
          const filteredProducts = data.filter(
            (product) => product.type === "Home"
          );
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);
  return (
    <div className="bg-gray-100 ">
      <div className="p-20 px-3 max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex flex-wrap flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1">
            <img src="/footer-image.png" alt="" className="h-20 " />
          </div>
          <div className="flex-1 text-center md:text-start leading-6 px-2">
            <p className="text-gray-600 font-[400] mb-2">
              It is an agency specializing in marketing and advertising,
              assistant to Companies like yours are thriving in the digital age.
            </p>
            <p className="text-gray-600 font-[400]">
              We offer a comprehensive range of compassionate and collaborative
              services to your world To communicate with your target audience.{" "}
              <Link
                to={"/sign-in"}
                className="font-semibold text-blue-600 hover:text-red-600 transition-all duration-200"
              >
                Sign In
              </Link>{" "}
              or{" "}
              <Link
                to={"/sign-up"}
                className="font-semibold text-blue-600 hover:text-red-600 transition-all duration-200"
              >
                Sign Up
              </Link>{" "}
              to get started!
            </p>
          </div>
        </div>
        {/* Hero Section Start Here */}
        {isLoading && (
          <div className="h-60 sm:h-64 xl:h-80 2xl:h-96">
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
              <Spinner className="h-12 w-12" color="failure" />
            </div>
          </div>
        )}
        {products && products.length > 0 && (
          <div className="h-60 sm:h-64 xl:h-80 2xl:h-96 mt-10 rounded-lg">
            <Carousel className="h-[320px]">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
                >
                  <img
                    src={product.image}
                    alt="product-image"
                    className="object-cover overflow-hidden w-full h-full"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {products && products.length === 0 && (
          <div className="h-60 sm:h-64 xl:h-80 2xl:h-96 mt-10 rounded-lg">
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
              <p className="text-4xl font-mono font-semibold">
                No Products Found.
              </p>
            </div>
          </div>
        )}
        {/* Hero Section End Here */}
        {/* Our Services Start Here */}
        <div className="flex flex-col gap-10 mt-20">
          <h2 className="text-5xl sm:text-6xl text-center font-semibold font-mono text-cyan-900">
            Our Services
          </h2>
          <div className="flex flex-wrap gap-4">
            {services.map((service) => (
              <ServiceComponent key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Our Services End Here */}
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default HomePage;
