/* eslint-disable no-undef */
import productModel from "../models/productModel.js";

import { google } from "googleapis";
import fs from "fs";

const KEYFILEPATH = "public/credential.json";
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

export const CreateProduct = async (req, res) => {
  await productModel.create(req.body);
  res.json({ title: "Succcess", message: "Product Created successfully" });
};

export const ViewProducts = async (req, res) => {
  const products = await productModel.find(req.query);
  res.json({ products });
};

export const UploadProductPhoto = async (req, res) => {
  const product = await productModel.findById(req.params.id);
  const newFileName = `${product._id}_${Date.now()}.${
    req.file.mimetype.split("/")[1]
  }`;
  const filePath = `public/images/${newFileName}`;
  fs.rename(`public/images/${req.file.filename}`, filePath, async () => {});
  CreateAndUploadFile(auth, newFileName, filePath, req, product, res).then(
    () => {
      fs.unlink(filePath, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  );
};

async function CreateAndUploadFile(
  auth,
  newFileName,
  filePath,
  req,
  product,
  res
) {
  const driveService = google.drive({ version: "v3", auth });

  let fileMetaData = {
    name: newFileName,
    parents: [process.env.GOOGLE_DRIVE_PARENT],
  };
  let media = {
    mimeType: req.file.mimeType,
    body: fs.createReadStream(filePath),
  };

  let response = await driveService.files.create({
    requestBody: fileMetaData,
    media,
    fields: "id",
  });

  switch (response.status) {
    case 200:
      await productModel.findByIdAndUpdate(product._id, {
        imageUrl: `https://drive.google.com/uc?id=${response.data.id}`,
      });
      res.json({ title: "Success", message: "Profile Photo Upated" });
      break;

    default:
      break;
  }
}
