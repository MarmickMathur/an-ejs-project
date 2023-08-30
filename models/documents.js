const mongoose = require("mongoose");
const users = require("./users");

const imageschema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
});

imageschema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const docsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: [imageschema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

docsSchema.post("save", async function (document) {
  const founduser = await users.findById(document.owner);
  founduser.documents.push(document);
  await founduser.save();
});

module.exports = mongoose.model("Docs", docsSchema);
