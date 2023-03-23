const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    // useFindAndModify: false,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  });

  if (!conn) {
    console.log("Error connecting to database");
  }
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
