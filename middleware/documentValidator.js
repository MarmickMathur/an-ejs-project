const documentjoischema = require("../schemas/documents");
const appError = require("../appError");

module.exports = (req, res, next) => {
  const { name } = req.body;
  const { error, value } = documentjoischema.validate({ name });
  if (!error) {
    next();
    // console.log("no error");
  } else {
    throw new appError(400);
  }
};
