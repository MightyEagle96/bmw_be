import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: String,
  description: String,
  amount: Number,
  quantity: Number,
  imageUrl: String,
  account: { type: Schema.Types.ObjectId, ref: "Account" },
});

export default model("Product", productSchema);
