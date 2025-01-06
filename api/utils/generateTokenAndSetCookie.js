import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, isAdmin, res) => {
  const token = jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt_token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
  });

  return token;
};
