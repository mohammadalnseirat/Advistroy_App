import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/userSlice/userSlice";
import { toast } from "react-hot-toast";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  // !handle change :
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //! handle Submit Data:
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Please Fill All Required Fields!"));
      toast.error("Please Fill All Required Fields!");
      return;
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/v1/auth/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        dispatch(signInSuccess(data.user));
        toast.success(data.message);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
              Sign In
            </h1>
            <p className="text-gray-500 text-sm capitalize">
              sign up to{" "}
              <span className="text-purple-700 font-semibold">Falcon</span> with
              your email and password{" "}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <Label value="Email:" className="text-blue-600 ml-1" />
              <TextInput
                id="email"
                type="email"
                placeholder="Enter your email..."
                required
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Label value="Password:" className="text-blue-600 ml-1" />
              <TextInput
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password..."
                required
                onChange={handleChange}
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

            <Button disabled={isLoading} type="submit" color="blue">
              {isLoading ? (
                <div className="flex items-center gap-1">
                  <span>Loading...</span>
                  <Spinner size="sm" color="failure" />
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-1 justify-start items-center md:justify-center italic mt-5">
            <GoDotFill className="size-3 text-red-500" />
            <p className="text-gray-500 text-sm">{"Don't"} have an Account?</p>
            <Link
              to={"/sign-up"}
              className="text-blue-500 font-semibold text-sm  hover:text-red-500 transition-all ease-in duration-100"
            >
              Sign Up
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

export default SignInPage;
