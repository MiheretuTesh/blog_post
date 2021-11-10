const express = require("express");
const importData = require("./data.json");
const app = express();
const connectDB = require("./db");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");

dotenv.config();

//connect to database
connectDB();

//Routes files

const posts = require("./routes/posts");
const reviews = require("./routes/reviews");
const users = require("./routes/users");

// body pareser
app.use(express.json());

//Mount routers

app.use("/api/v1/posts", posts);
app.use("/api/v1/review", reviews);
app.use("/api/v1/users", users);

// Error middleware
app.use(errorHandler);

// if (process.env.NODE_ENV == "DEVELOPMENT") {
//     app.use(morgan("dev"));
//   }

const port = process.env.PORT || 5000;

const server = app.listen(5000, () => {
  console.log(`sever is running on port ${port}`.yellow.bold);
});

// handel unhandled promise rejections to

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err}`);
  server.close(() => process.exit(1));
});

// app.listen(PORT, (req, res) => {console.log(`listening on port ${PORT}`)})

// https://git.heroku.com/blogpostnodeapinewapp.git

//https://blogpostnodeapinewapp.herokuapp.com/
