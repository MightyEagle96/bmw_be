import mongoose from "mongoose";
const { Schema, model } = mongoose;

const facebookCustomers = new Schema({
  accessToken: String,
  email: String,
  name: String,
  picture: {
    data: {
      height: Number,
      is_silhouette: Boolean,
      url: String,
      width: Number,
    },
  },
});

const googleCustomers = new Schema({});

const FacebookSchema = model("FacebookSchema", facebookCustomers);

const GoogleSchema = model("GoogleSchema", googleCustomers);

export { FacebookSchema, GoogleSchema };
