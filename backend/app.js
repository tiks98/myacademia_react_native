const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
var User = require("./models/user");
var Profile = require("./models/profile");
app.use(cookieParser());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://MyAcademia:MyAcademia987789@cluster0.czdwc.mongodb.net/myacademia?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var db = mongoose.connection;

db.on("error", () => console.log("There was a error connecting to MongoDB"));
db.once("open", () => console.log("We have connected to MongoDB"));

const userRouter = require("./routes/users");
const profileRouter = require("./routes/profilesRoute");
const educationRouter = require("./routes/educationRoute");
const workRouter = require("./routes/workRoute");
const searchRouter = require("./routes/searchRoute");
const friendshipRouter = require("./routes/friendshipRoute");
const blogRouter = require("./routes/blogRoute");
const notificationRouter = require("./routes/notificationRoute");
const challengeRouter = require("./routes/challengeRoute");
const scoreRouter = require("./routes/scoreRoute");
// var indexRouter = require("./index");
// var homeRouter = require("./routes/home");

//using Middleware -- Reference: https://github.com/woodburydev/passport-local-video/blob/master/backend/server.js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:19006", // <-- location of the react app were connecting to
//     credentials: true,
//   })
// );
// app.use(
//   cors({
//     origin: "exp://10.0.0.39:19000",
//     credentials: true,
//   })
// );

var whiteList = [
  "http://10.0.0.39:19000",
  "http://192.168.126.1:19006",
  "exp://10.0.0.39:19000",
  "http://localhost:19006",
  "http://10.0.2.2:19006",
  "http://localhost:3000",
  "http://10.0.2.2:3000",
  "http://10.0.0.39:80",
  "http://192.168.126.1:4000",
  "http://10.0.2.2:4000",
  "http://10.0.0.39:4000",
  "http://192.168.126.1:80",
  "*",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(
  cors({
    origin: whiteList,
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use(cors(corsOptions));
// app.use(
//   cors({
//     origin: "http://192.168.126.1:19006",
//     credentials: true,
//   })
// );
// app.use(
//   cors({
//     origin: "http://10.0.2.2:19006",
//     credentials: true,
//   })
// );

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// app.use("/", authRouter); //routing it to authRouter
app.use("/user", userRouter);
app.use(
  "/",
  profileRouter,
  educationRouter,
  workRouter,
  searchRouter,
  friendshipRouter,
  blogRouter,
  friendshipRouter,
  notificationRouter,
  challengeRouter,
  scoreRouter
);
// app.use("/search", searchRouter);

app.listen(4000, () => {
  console.log("Server has started");
});

module.exports = app;
