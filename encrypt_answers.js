// encrypt-answers.js (Node.js script, run once)
const crypto = require("crypto");
const fs = require("fs");

const key = crypto.scryptSync("explorerstakesuptoomuchofmytime", "salt", 32); // 32-byte key
const iv = Buffer.alloc(16, 0); // fixed IV for simplicity (change if you want more security)

function encrypt(text) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

const questions = JSON.parse(fs.readFileSync("questions.json", "utf8"));

questions.forEach(q => {
  q.answer = encrypt(q.answer); // replace with encrypted version
});

fs.writeFileSync("questions.encrypted.json", JSON.stringify(questions, null, 2));
console.log("✅ Encrypted file written to questions.encrypted.json");
