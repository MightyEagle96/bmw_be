/* eslint-disable no-undef */
import productModel from "../models/productModel.js";
import { ErrorHandler } from "../controllers/ErrorController.js";

import { google } from "googleapis";
import fs from "fs";

const KEYFILEPATH = "public/sterlingserviceaccount.json";
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

export const CreateProduct = async (req, res) => {
  req.body.account = req.account._id;
  await productModel.create(req.body);
  res.json({ title: "Succcess", message: "Product Created successfully" });
};

export const ViewProducts = async (req, res) => {
  const products = await productModel.find(req.query);
  res.json({ products });
};

export const ViewProduct = async (req, res) => {
  const product = await productModel.findById(req.params.id);

  res.json({ product });
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

export const UploadProductImages = async (req, res) => {
  console.log(req.files);
  // try {
  //   for (let i = 0; i < req.files.length; i++) {
  //     const newFileName = `${req.params.id}img${i}.${
  //       req.files[i].mimetype.split("/")[1]
  //     }`;

  //     const filePath = `public/images/${newFileName}`;

  //     fs.rename(
  //       `public/images/${req.files[i].filename}`,
  //       filePath,
  //       async () => {}
  //     );

  //     CreateAndUploadFile(auth, newFileName, req.files[i], filePath);
  //   }

  //   res.status(201).send("Product images uploaded successfully");
  //   DeletePhotos();
  // } catch (error) {
  //   console.log(error);
  //   ErrorHandler(error, res);
  // }

  res.json({ title: "success", message: "image uploaded successfully" });
};
async function CreateAndUploadFile(auth, newFileName, file, filePath) {
  const driveService = google.drive({ version: "v3", auth });

  let fileMetaData = {
    name: newFileName,
    parents: ["1UFsyKj7RtN8qkJICYEgK9n35Av2D_gLF"],
  };

  let media = {
    mimetype: file.mimetype,
    body: fs.createReadStream(filePath),
  };

  let response = await driveService.files.create({
    requestBody: fileMetaData,
    media,
    fields: "id",
  });

  switch (response.status) {
    case 200:
      console.log("success");
      await product.findByIdAndUpdate(req.params.id, {
        $push: {
          images: `https://drive.google.com/uc?id=${response.data.id}`,
        },
      });

      break;

    default:
      break;
  }
}
function DeletePhotos() {
  const folder = "public/images";
  fs.readdir(folder, (err, files) => {
    if (err) console.log(err);

    files.forEach((file) => {
      fs.unlink(`${folder}/${file}`, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  });
}
