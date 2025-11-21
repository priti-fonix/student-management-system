const { urlencoded } = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const { connectdb } = require("./config/db");
const { sendOtpEmail } = require("./utils/mailer");
const authRoute = require("./routers/authRoute");
const studentRoute = require("./routers/studentRoute");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client/public")));
connectdb();

console.log(`this is  an exploring project dude!`);

app.get("/home", (req, res) => {
  res.json({
    message: "this is the <h1> home page</h1>",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/students", studentRoute);
app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:5001`);
});
