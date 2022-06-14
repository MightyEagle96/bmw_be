import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
  amount: Number,
  currency: String,
  customer: {
    name: String,
    email: String,
    phone_number: String,
    address: String,
  },
  flw_ref: String,
  status: String,
  transaction_id: Number,
  tx_ref: Number,
  quantity: Number,
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  account: { type: Schema.Types.ObjectId, ref: "Account" },
  productStatus: { type: String, default: "pending" },
  dateShipped: { type: Date },
  dateDelivered: { type: Date },
});

export default model("Payment", paymentSchema);
