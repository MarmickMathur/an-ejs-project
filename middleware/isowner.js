const Doc = require("../models/documents");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const doc = await Doc.findById(id).populate("owner");

  if (!doc.owner.equals(req.user) || !doc) {
    res.redirect("/documents");
  }
  next();
};
