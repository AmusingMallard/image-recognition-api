const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const knex = require("knex");

const image = require("./controllers/image");
const profile = require("./controllers/profile");
const register = require("./controllers/register");
const signin = require("./controllers/signin");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "sober-thud-reporter",
    database: "imagerecognition",
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:id", profile.handleProfileGet(db));
app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleApiCall());

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
