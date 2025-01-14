const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("../Backend/routes/User");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/database");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));

// Serve static files
app.get("/*", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  res.sendFile(filePath);
});

dotenv.config();
database.connect();

app.use("/user", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
