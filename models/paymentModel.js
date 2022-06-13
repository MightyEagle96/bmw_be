import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
  amount: Number,
  currency: String,
  customer: { name: String, email: String, phone_number: String },
  flw_ref: String,
  status: String,
  transaction_id: Number,
  tx_ref: Number,
  quantity: Number,
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

export default model("Payment", paymentSchema);
