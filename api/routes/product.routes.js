import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  createADS,
  getAllProducts,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/create", protectedRoute, createADS);
router.get("/get-all-products", getAllProducts);

export default router;
