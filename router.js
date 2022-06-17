import express from "express";
import multer from "multer";
import {
  CreateAccount,
  FacebookAccount,
  IsLoggedIn,
  Login,
  VerifyAccount,
} from "./authentication/authController.js";
import {
  PutInTransit,
  RecordPayment,
  ViewOrders,
} from "./controllers/PaymentController.js";
import {
  CreateProduct,
  ViewProduct,
  ViewProducts,
  UploadProductImages,
  UploadProgress,
} from "./controllers/ProductController.js";

const router = express.Router();
const upload = multer({ dest: "public/images" });
router
  .post("/createAccount", CreateAccount)
  .post("/facebookAccount", FacebookAccount)
  .post("/login", Login)
  .post("/verifyAccount", VerifyAccount)
  .post("/createProduct", IsLoggedIn, CreateProduct)
  .get("/viewProducts", ViewProducts)
  .get("/viewProduct/:id", ViewProduct)
  .get("/uploadProgress", UploadProgress)

  .post("/recordPayment", RecordPayment)
  .patch(
    "/uploadProductImages/:id",
    upload.array("images", 10),
    UploadProductImages
  )

  .get("/viewOrders/:id", ViewOrders)
  .patch("/putInTransit/:id", PutInTransit);

export default router;
