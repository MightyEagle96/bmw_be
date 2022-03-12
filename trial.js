import crypto from "crypto";

const token = crypto.randomUUID();

const formatted = [];
for (let i = 0; i < token.length; i++) {
  if (token[i] !== "-") {
    formatted.push(token[i]);
  }
}

export const tokenUUID = formatted.join("");
// console.log(formatted.join(""));
