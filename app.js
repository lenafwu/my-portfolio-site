// dependencies
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");

// routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const contactsRouter = require("./routes/contacts");

const app = express();

const { connectDB } = require("./config/database");
const configurePassport = require("./config/passport");
const session = require("express-session");

// apply session to all requests
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: "sessionSecret",
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// initialze passport
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

//add user to res.locals
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/contacts", contactsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
