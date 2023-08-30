const mongoose = require("mongoose");
const doc = require("../models/documents");
const names = require("./names");
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/docu");
}

const docs = [];

try {
  main();
} catch (e) {
  console.log(e);
}

for (let i = 0; i < 50; i++) {
  const name = names[Math.floor(Math.random() * 4)];
  const newdoc = new doc({
    name,
    images: [
      {
        filename: "sample image",
        url: "https://res.cloudinary.com/dgvwt0wcv/image/upload/v1693216087/Documents/mfjod9lbwohxcxqq4ppq.png",
      },
    ],
    owner: "64e21a8a758b5599f62daead",
  });
  docs.push(newdoc);
}

async function run() {
  await doc.deleteMany({});
  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    await doc.save();
  }
}

run();
