import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import FooterComponent from "./components/FooterComponent";
import Ads from "./pages/Ads";
import { Toaster } from "react-hot-toast";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import { useSelector } from "react-redux";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-gray-50">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/sign-up"
            element={!currentUser ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/sign-in"
            element={!currentUser ? <SignInPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/contact-us"
            element={currentUser ? <ContactUs /> : <Navigate to={"/sign-in"} />}
          />
          <Route
            path="/ads"
            element={currentUser ? <Ads /> : <Navigate to={"/sign-in"} />}
          />
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        <FooterComponent />
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
