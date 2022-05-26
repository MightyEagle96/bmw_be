import express from "express";
import multer from "multer";
import {
  CreateProduct,
  UploadProductPhoto,
} from "../controllers/ProductController";
const upload = multer({ dest: "public/images" });

const productRouter = express.Router();

productRouter
  .post("/createProduct", CreateProduct)
  .post(
    "/uploadProductPhoto/:id",
    upload.single("productPhoto"),
    UploadProductPhoto
  );
