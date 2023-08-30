if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const User = require("./models/users");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const app = express();
const documents = require("./routes/docuroutes");
const users = require("./routes/userroutes");
const appError = require("./appError");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/docu");
}

try {
  main();
} catch (e) {
  console.log(e);
}
// --------------------------------session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // this is so that cookie expired after a certain time
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // this is so that cookie expired after a certain time
    },
  })
);

// -------------------------------passport
app.use(passport.session());
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// -------------------------method override
app.use(methodOverride("_method"));
// -----------------------------body parse
app.use(express.urlencoded({ extended: true }));
// ----------------------------views and ejs
app.engine("ejs", engine);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
// ------------------------------static files
app.use(express.static(path.join(__dirname, "public")));
// ---------------------------------local access variables
app.use((req, res, next) => {
  res.locals.user = req.user;
  // console.log(res.locals.user);
  next();
});
// -------------------------routes
app.get("/home", (req, res) => {
  res.render("extras/home");
});

app.get("/dashboard", (req, res) => {
  res.render("dashb/dash");
});

// -----------------------------documents----------------------
app.use("/documents", documents);
// -----------------------------authenticaiton-----------------
app.use("/users", users);
// --------------------------error handelor--------------------------

app.get("/error", (req, res) => {
  throw new appError();
});

app.get("/troll", (req, res) => {
  res.render("extras/troll");
});

app.all("*", (req, res) => {
  res.status(404);
  res.send("not found");
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  console.dir(err);
  if (!err.message) {
    err.message = "server side error form error handleor";
  }
  res.render("extras/error", { err });
});

// -------------------------------------------------------------
app.listen(3000, () => {
  console.log("hello;");
});
