const express = require('express');

const app = express();

const mongoose = require("mongoose");
let userRoutes = require("./routes/user")

//Connect to database
try {
  mongoose.connect("mongodb://localhost:27017/usersdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log("connected to db");
} catch (error) {
  handleError("Error", error);
}
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});




require("dotenv").config();

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}))

app.use(userRoutes)

app.listen(process.env.PORT || 8080, () => {
  console.log(`server is listening on ${process.env.PORT} `);
})