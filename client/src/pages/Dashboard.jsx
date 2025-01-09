import {
  Button,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { IoMdCloseCircle } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [fileImage, setFileImage] = useState(null);
  const fileRef = useRef(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    type: "",
    price: "",
    image: "",
    location: "",
    phoneNumberItem: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);

  //? handleFileChange:
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
      setFileImage(file);
    }
  };
  //? handle Submit Create Ads:
  const handleSubmitCreateAds = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newProduct.title,
          description: newProduct.description,
          type: newProduct.type,
          price: Number(newProduct.price),
          image: newProduct.image,
          location: newProduct.location,
          phoneNumberItem: newProduct.phoneNumberItem,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        toast.success("Product created successfully!");
        setNewProduct({
          title: "",
          description: "",
          type: "",
          price: "",
          image: "",
          location: "",
          phoneNumberItem: "",
        });
        if (newProduct.type === "Home") {
          navigate("/");
        } else {
          navigate("/ads");
        }
        fileRef.current.value = null;
        setFileImage(null);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 sm:mt-10 min-h-screen">
      <div className="w-full max-w-2xl mx-auto p-10 px-4">
        <div className="flex flex-col w-full gap-4">
          <h1 className="text-5xl font-mono sm:text-6xl text-center font-bold text-cyan-800">
            Create Ads
          </h1>
          <div className="my-10 p-4 md:p-6 border border-gray-300 rounded-lg shadow-sm">
            <form onSubmit={handleSubmitCreateAds} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label
                  value="product title :"
                  className="capitalize ml-1 text-sm md:text-md font-semibold text-blue-600"
                />
                <TextInput
                  type="text"
                  placeholder="Enter the title..."
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                  id="title"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  value="product description : "
                  className="capitalize ml-1 text-sm md:text-md font-semibold text-blue-600"
                />
                <Textarea
                  placeholder="Enter the description..."
                  id="description"
                  type="text"
                  value={newProduct.description}
                  onChange={(e) => {
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    });
                  }}
                  rows={5}
                  className="resize-none h-32"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  value="product price : "
                  className="capitalize ml-1 text-sm md:text-md font-semibold text-blue-600"
                />
                <TextInput
                  type="text"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder="Enter the price..."
                  id="price"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  value="Location : "
                  className="capitalize ml-1 text-sm md:text-md font-semibold text-blue-600"
                />
                <TextInput
                  type="text"
                  value={newProduct.location}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, location: e.target.value })
                  }
                  placeholder="Enter the price..."
                  id="location"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  value="Phone Number: "
                  className="capitalize ml-1 text-sm md:text-md font-semibold text-blue-600"
                />
                <PhoneInput
                  country={"us"}
                  inputStyle={{ width: "100%" }}
                  value={newProduct.phoneNumberItem}
                  onChange={(value) =>
                    setNewProduct({
                      ...newProduct,
                      phoneNumberItem: value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  value="product type :"
                  className="capitalize ml-1 text-sm md:text-md font-semibold text-blue-600"
                />
                <Select
                  value={newProduct.type}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, type: e.target.value });
                  }}
                  placeholder="Select product type..."
                  id="type"
                >
                  <option>Select product type...</option>
                  <option value="Home">Home</option>
                  <option value="Ads">Ads</option>
                </Select>
              </div>
              <div className="flex flex-col  gap-2">
                <Label
                  value="product image : "
                  className="ml-1 font-semibold text-sm md:text-md text-blue-600 capitalize"
                />
                <input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleFileChange}
                />
                <div className="flex gap-6">
                  <img
                    src="/upload.avif"
                    alt="upload-image"
                    className="h-20 sm:h-32 w-20  sm:w-32 cursor-pointer border-2 border-dashed border-t-purple-600 border-r-purple-700 border-b-red-600 border-l-red-700"
                    onClick={() => fileRef.current.click()}
                  />
                  {fileImage && (
                    <p className="text-sm mt-5 sm:mt-10 hidden sm:block font-semibold text-green-500">
                      {fileImage?.name} uploaded successfully.
                    </p>
                  )}
                  {newProduct.image && (
                    <div className="relative">
                      <img
                        src={newProduct.image}
                        alt="product-imag"
                        className="h-20 sm:h-32 w-20  sm:w-32"
                      />
                      <div
                        onClick={() => {
                          setNewProduct({
                            image: "",
                          });
                          setFileImage(null);
                          fileRef.current.value = null;
                        }}
                        className="absolute -top-5 right-0 cursor-pointer"
                      >
                        <IoMdCloseCircle className="size-5 text-red-600" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Button
                disabled={loading}
                type="submit"
                className="w-full mt-5"
                gradientDuoTone="purpleToBlue"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    Creating...
                    <Spinner
                      size="sm"
                      color="failure"
                      aria-label="Failure spinner example"
                    />
                  </div>
                ) : (
                  "Create Ads"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
