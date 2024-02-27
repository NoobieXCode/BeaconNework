const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
  //   console.log("MongoDB URL:", MONGODB_URL); // Add this line for debugging
  mongoose
    .connect(MONGODB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(console.log(`DB Connection Success`))
    .catch((err) => {
      console.log(`DB Connection Failed`);
      console.log(err);
      process.exit(1);
    });
};
