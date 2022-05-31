import express from "express";
import multer from "multer";
import { IsLoggedIn } from "../authentication/AuthController.js";
import {
  CreateProduct,
  UploadProductPhoto,
  ViewProducts,
} from "../controllers/ProductController.js";
const upload = multer({ dest: "public/images" });

const productRouter = express.Router();

productRouter
  .post("/createProduct", IsLoggedIn, CreateProduct)
  .post(
    "/uploadProductPhoto/:id",
    upload.single("productPhoto"),
    UploadProductPhoto
  )
  .get("/viewProducts", ViewProducts);

export default productRouter;
