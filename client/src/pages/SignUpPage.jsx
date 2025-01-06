import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "../redux/userSlice/userSlice";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const { isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //! handle Submit Data:
  const handleSubmitData = async (e) => {
    e.preventDefault();
    dispatch(signUpStart());
    if (
      !formData.username ||
      !formData.password ||
      !formData.email ||
      !formData.phone
    ) {
      dispatch(signUpFailure("Please Fill All Required Fields!"));
      toast.error(error.message);
      return;
    }
    try {
      const res = await fetch("/api/v1/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(signUpFailure(data.message));
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        dispatch(signUpSuccess(data.user));
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      dispatch(signUpFailure(error.message));
      toast.error(error.message);
    }
  };
  return (
    <div className=" min-h-screen mt-20">
      {/* container */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-5 p-3">
        {/* Left Side Start Here */}
        <div className="flex-1 order-2  border border-gray-300 rounded-md shadow-sm p-5">
          <div className="flex flex-col  gap-2 mb-5">
            <h1 className="text-blue-500 text-xl md:text-3xl font-semibold">
              Sign Up
            </h1>
            <p className="text-gray-500 text-sm capitalize">
              sign up to{" "}
              <span className="text-purple-700 font-semibold">Falcon</span> with
              your email and password{" "}
            </p>
          </div>
          <form onSubmit={handleSubmitData} className="flex flex-col gap-3">
            <div>
              <Label value="User Name:" className="text-blue-600 ml-1" />
              <TextInput
                id="username"
                type="text"
                placeholder="Enter your user name..."
                required
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <Label value="Email:" className="text-blue-600 ml-1" />
              <TextInput
                id="email"
                type="email"
                placeholder="Enter your email..."
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <Label value="Password:" className="text-blue-600 ml-1" />
              <TextInput
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password..."
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {showPassword ? (
                <>
                  <FaEyeSlash
                    onClick={() => setShowPassword(false)}
                    className="absolute top-9 right-4 cursor-pointer text-lg "
                  />
                </>
              ) : (
                <>
                  <FaEye
                    onClick={() => setShowPassword(true)}
                    className="absolute top-9 right-4 cursor-pointer text-lg"
                  />
                </>
              )}
            </div>
            <div>
              <Label value="Phone Number:" className="text-blue-600 ml-1" />
              <PhoneInput
                country={"us"}
                inputStyle={{ width: "100%" }}
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
              />
            </div>
            <Button disabled={isLoading} type="submit" color="blue">
              {isLoading ? (
                <div className="flex items-center gap-1">
                  <span>Loading...</span>
                  <Spinner size="sm" color="failure" />
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-1 justify-start items-center md:justify-center italic mt-5">
            <GoDotFill className="size-3 text-red-500" />
            <p className="text-gray-500 text-sm">Already have an Account?</p>
            <Link
              to={"/sign-in"}
              className="text-blue-500 font-semibold text-sm  hover:text-red-500 transition-all ease-in duration-100"
            >
              Sign In
            </Link>
          </div>
        </div>
        {/* Left Side End Here */}
        {/* Right Side Start Here */}
        <div className="flex-1 md:order-2 account-right-part rounded-md">
          <div className="flex flex-col gap-32 items-center justify-between p-4">
            <h2 className="capitalize mt-3 text-5xl md:text-6xl font-bold text-gray-100">
              Welcome to <span className="italic text-gray-300">Falcon</span>
            </h2>
            <div className="flex justify-start items-start -ml-40 w-36 h-36">
              <img
                src="/logo.png"
                alt="self"
                className="w-full h-full animate-bounce"
              />
            </div>
          </div>
        </div>
        {/* Right Side End Here */}
      </div>
    </div>
  );
};

export default SignUpPage;
