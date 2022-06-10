import express from "express";
import multer from "multer";
import {
  CreateAccount,
  IsLoggedIn,
  Login,
  VerifyAccount,
} from "./authentication/authController.js";
import {
  CreateProduct,
  ViewProduct,
  ViewProducts,
  UploadProductImages,
} from "./controllers/ProductController.js";

const router = express.Router();
const upload = multer({ dest: "public/images" });
router
  .post("/createAccount", CreateAccount)
  .post("/login", Login)
  .post("/verifyAccount", VerifyAccount)
  .post("/createProduct", IsLoggedIn, CreateProduct)
  .get("/viewProducts", ViewProducts)
  .get("/viewProduct/:id", ViewProduct)
  .patch(
    "/uploadProductImages/:id",
    upload.array("images", 4),
    UploadProductImages
  );

export default router;
