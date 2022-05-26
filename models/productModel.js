import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: String,
  description: String,
  amount: Number,
  quantity: Number,
  imageUrl: String,
});

export default model("Product", productSchema);
