const mongoose = require("mongoose");
const color = require("colors");

const connectDB = async () => {
    console.log("Trying to connect to database")
  const conn = await mongoose.connect(process.env.DB_URI, {
      
    // useCreateIndex: true,
    // useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoBD connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
