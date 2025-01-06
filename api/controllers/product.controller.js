import cloudinary from "../config/cloudinary.js";
import Product from "../models/product.model.js";
import { handleError } from "../utils/error.js";

//! 1- Function To Create Product:
export const createADS = async (req, res, next) => {
  try {
    const { title, description, type, price, image } = req.body;
    let cloudinaryResponse;
    if (!req.user.isAdmin) {
      return next(handleError(403, "You are not allowed to create a post!"));
    }
    if (!title || !description || !type || !price) {
      return next(handleError(403, "Please Fill All Required Fields!"));
    }
    if (!image) {
      return next(handleError(403, "Please Upload an Image!"));
    }
    if (title.length < 5) {
      return next(
        handleError(403, "Title Should Be At Least 5 Characters Long!")
      );
    }
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "posts",
      });
    }
    //? create product:
    const product = await Product.create({
      title,
      description,
      type,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse?.secure_url
        : "",
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("Error creating product:", error.message);
    next(error);
  }
};

//! 2- Function To Get All Products:
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.log("Error getting all products:", error.message);
    next(error);
  }
};
