import { productStatus, socialType } from "../labels.js";
import paymentModel from "../models/paymentModel.js";
import { ErrorHandler } from "./ErrorController.js";

export const RecordPayment = async (req, res) => {
  try {
    //check social media type of the user

    if (req.body.socialType === socialType.FB) {
      req.body.fbCustomer = req.body.user;
    }

    // if (req.body.social === socialType.GMAIL) {
    // }

    await paymentModel.create(req.body);
    res.status(201).json({
      title: "success",
      quote: "Transaction approved. You will be contacted shortly",
      type: "success",
      status: true,
    });
    //req.body.status === "successful"

    // ? res.status(201).json({
    //     title: "success",
    //     quote: "Transaction approved. You will be contacted shortly",
    //     type: "success",
    //     status: true,
    //   })
    // : res.status(400).json({
    //     title: "oops",
    //     quote:
    //       "Sorry we couldn't process your transaction at this time. Try again later",
    //     type: "error",
    //     status: true,
    //   });
    //notify the vendor
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const ViewOrders = async (req, res) => {
  const orders = await paymentModel
    .find({ account: req.params.id, ...req.query })
    .populate("product");
  res.json({ orders });
};

export const PutInTransit = async (req, res) => {
  await paymentModel.findByIdAndUpdate(req.params.id, {
    productStatus: productStatus.shipped,
    dateShipped: Date.now(),
  });

  res.json({ title: "Success", message: "Product is now in transit" });
};
