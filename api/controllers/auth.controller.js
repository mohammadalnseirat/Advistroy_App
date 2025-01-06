import User from "../models/user.model.js";
import { handleError } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

//! 1- Function To Sign Up User:
export const signUpUser = async (req, res, next) => {
  try {
    const { username, email, password, phoneNumber } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      !phoneNumber ||
      username === "" ||
      email === "" ||
      password === "" ||
      phoneNumber === ""
    ) {
      return next(handleError(403, "Please Fill All Required Fields!"));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(handleError(403, "Invalid email or password!"));
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordRegex.test(password) || passwordRegex.length < 8) {
      return next(
        handleError(
          403,
          " passwords must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
      );
    }
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, newUser.isAdmin, res);
      await newUser.save();
      newUser.password = undefined;
      res.status(201).json({
        message: "User Sign Up Successfully!",
        user: newUser,
      });
    } else {
      return next(handleError(500, "Invalid User Data!"));
    }
    res.status(201).json({ message: "User Sign Up Successfully!" });
  } catch (error) {
    console.log("Error signing up user:", error.message);
    next(error);
  }
};

//! 2- Function To Log In User:
export const logInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || password === "" || email === "") {
      return next(handleError(403, "Please Fill All Required Fields!"));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(handleError(404, "Invalid email or password!"));
    }
    const isMatchPassword = bcryptjs.compareSync(password, user.password);
    if (!isMatchPassword) {
      return next(
        handleError(403, "Invalid Password! Enter a correct Password.")
      );
    }
    //! generate token:
    generateTokenAndSetCookie(user._id, user.isAdmin, res);
    user.password = undefined;
    res.status(200).json({
      message: "User Log In Successfully!",
      user,
    });
  } catch (error) {
    console.log("Error logging in user:", error.message);
    next(error);
  }
};

//! 3- Function To Log Out User:
export const logOutUser = async (req, res, next) => {
  try {
    res.clearCookie("jwt_token");
    res.status(200).json({ message: "User Log Out Successfully!" });
  } catch (error) {
    console.log("Error logging out user:", error.message);
    next(error);
  }
};
