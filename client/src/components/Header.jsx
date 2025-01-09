import { Button, Navbar, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/userSlice/userSlice";
import toast from "react-hot-toast";
const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //? handleSignOut:
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/v1/auth/log-out", {
        method: "POST",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        dispatch(signOutSuccess(data.message));
        toast.success(data.message);
        // navigate("/sign-in");
      }
    } catch (error) {
      dispatch(signOutFailure(error.message));
      toast.error(error.message);
    }
  };
  return (
    <Navbar className="border-b-2 border-gray-200 shadow-sm bg-[#010852]">
      <Link to={"/"} className="flex items-center  text-gray-50">
        <img src="/logo.png" alt="logo" className="h-10" />
        <span className="text-2xl hidden sm:block font-semibold font-mono text-purple-600">
          Falcon
        </span>
      </Link>
      <div className="flex items-center gap-2 md:order-2">
        {currentUser && (
          <Button
            size="sm"
            type="button"
            gradientMonochrome="failure"
            onClick={handleSignOut}
          >
            {isLoading ? (
              <div className="flex items-center gap-1">
                <span>Loading...</span>
                <Spinner size="sm" color="warning" />
              </div>
            ) : (
              "Sign Out"
            )}
          </Button>
        )}
        {pathname === "/" && !currentUser && (
          <Button size="sm">
            <Link to={"/sign-in"}>Sign In</Link>
          </Button>
        )}

        {currentUser && currentUser.isAdmin && (
          <Button
            size="sm"
            onClick={() => navigate("/dashboard")}
            gradientMonochrome="purple"
            className="hover:bg-[#010852]  transition-all duration-300"
          >
            Dashboard
          </Button>
        )}
        <Navbar.Toggle className="border border-gray-500" />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="text-gray-50 hover:bg-gray-800" as={"div"}>
          <Link
            to={"/"}
            className={`text-lg  ${pathname === "/" ? "text-cyan-600" : ""}`}
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link className="text-gray-50 hover:bg-gray-800" as={"div"}>
          <Link
            to={"/ads"}
            className={`text-lg ${pathname === "/ads" ? "text-cyan-600" : ""}`}
          >
            Ads
          </Link>
        </Navbar.Link>
        <Navbar.Link className="text-gray-50 hover:bg-gray-800" as={"div"}>
          <Link
            to={"/contact-us"}
            className={`text-lg ${
              pathname === "/contact-us" ? "text-cyan-600" : ""
            }`}
          >
            ContactUs
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
