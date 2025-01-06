import jwt from "jsonwebtoken";
import { handleError } from "../utils/error.js";
import User from "../models/user.model.js";
// ? Protected Routes:
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;
    if (!token) {
      return next(handleError(401, "Unauthorized-No token provided."));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return next(handleError(401, "Unauthorized-Invalid token."));
    }
    const currentUser = await User.findById(decoded.userId).select("-password");
    if (!currentUser) {
      return next(handleError(404, "Unauthorized-Invaild Email or Password."));
    }
    req.user = currentUser;
    next();
  } catch (error) {
    console.log("Error while protected route", error.message);
    next(error);
  }
};
