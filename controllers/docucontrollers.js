const Doc = require("../models/documents");
const catchasync = require("../utils/catchasync");
const { cloudinary } = require("../cloudinary");

module.exports.loaddocuments = catchasync(async (req, res) => {
  const { _id } = req.user;
  // console.log(_id);
  const data = await Doc.find({ owner: _id });
  // console.log(data);
  res.render("documents/test", { data });
});

module.exports.adddocument = catchasync(async (req, res) => {
  const images = req.files.map((f) => {
    return { url: f.path, filename: f.filename };
  });
  const { name } = req.body;
  const newDoc = new Doc({ name, owner: req.user });
  newDoc.images = images;
  await newDoc.save();
  console.log(newDoc);
  res.redirect(`/documents/${newDoc._id}`);
});

module.exports.viewdocument = catchasync(async (req, res) => {
  const { id } = req.params;
  const foundDoc = await Doc.findById(id);
  if (!foundDoc) {
    throw new appError("404", "doc not found");
  }
  // console.log(foundDoc);
  res.render("documents/show", { foundDoc });
});

module.exports.editdocument = catchasync(async (req, res) => {
  const { id } = req.params;
  const foundDoc = await Doc.findById(id);
  if (!foundDoc) {
    throw new appError("404", "doc not found");
  }
  res.render("documents/edit", { foundDoc });
});

module.exports.updatedocument = catchasync(async (req, res) => {
  const { id } = req.params;
  const { name, todelete } = req.body;
  // console.log(req.body);
  const newImages = req.files.map((f) => {
    return { url: f.path, filename: f.filename };
  });
  const doc = await Doc.findById(id);
  // console.log(doc);
  if (doc.errors) {
    throw new appError();
  }
  doc.images.push(...newImages);
  doc.name = name;
  await doc.save();
  if (todelete.length) {
    todelete.forEach((img) => {
      cloudinary.uploader.destroy(img.filename);
    });
    await doc.updateOne({
      $pull: { images: { filename: { $in: req.body.todelete } } },
    });
  }
  // console.log(doc);
  res.redirect(`/documents/${id}`);
});

module.exports.deletedocument = catchasync(async (req, res) => {
  const { id } = req.params;
  const doc = await Doc.findByIdAndDelete(id);
  res.redirect("/documents");
});
