import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";
import { originURL } from "./utils/data.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "devmightyeagle@gmail.com",
    pass: "Servantofgod1996",
  },
});

//const link = process.env.NODE_ENV === 'production'?
export const mailOptions = (name, email, link) => {
  return {
    from: "mightyeaglecorp@gmail.com",
    to: email,
    subject: "New Vendor Created",
    text: "We are moving o",
    html: emailTemplate(name, link),
  };
};

export const sendEmail = (mailOptions) =>
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      //console.log("Email sent: " + info.response);
    }
  });

export const redirectUrl = (token) => `${originURL}/accountValidated/${token}`;
