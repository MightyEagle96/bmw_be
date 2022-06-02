import express from "express";
import {
  CreateAccount,
  IsLoggedIn,
  Login,
} from "./authentication/authController.js";
import {
  CreateProduct,
  ViewProduct,
  ViewProducts,
} from "./controllers/ProductController.js";

const router = express.Router();

router
  .post("/createAccount", CreateAccount)
  .post("/login", Login)
  .post("/createProduct", IsLoggedIn, CreateProduct)
  .get("/viewProducts", ViewProducts)
  .get("/viewProduct", ViewProduct);

export default router;
