require("dotenv").config();
const mongoose = require("mongoose");
const mongoDB_URL = process.env["MONGODB_URL"];

// export connectDB function
module.exports = {
  connectDB: async function () {
    try {
      await mongoose.connect(mongoDB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  },
};
