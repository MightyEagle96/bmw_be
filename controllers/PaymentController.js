import paymentModel from "../models/paymentModel.js";
import { ErrorHandler } from "./ErrorController.js";

export const RecordPayment = async (req, res) => {
  try {
    //record the transaction

    await paymentModel.create(req.body);
    req.body.status === "successful"
      ? res.status(201).json({
          title: "success",
          quote: "Transaction approved. You will be contacted shortly",
          type: "success",
          status: true,
        })
      : res.status(400).json({
          title: "oops",
          quote:
            "Sorry we couldn't process your transaction at this time. Try again later",
          type: "error",
          status: true,
        });
    //notify the vendor
  } catch (error) {
    ErrorHandler(error, res);
  }
};
