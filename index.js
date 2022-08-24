// express is an server-side web framework for node.js which execute our code on the web
const express = require("express");
//body parser is a middleware, used to process data sent through an HTTP request body.
const bodyParser = require("body-parser");
const route = require("./src/Routes/routes"); //imported route
const mongoose = require("mongoose"); //Object data modeling library for mongoDB
const app = express(); //Assign express in app variable



app.use(bodyParser.json()); //transforms the text-based JSON input into JS-accessible variables

mongoose
  .connect(
    "mongodb+srv://Rubi_db:T2P9R5d5lWl7SRAF@cluster0.tvyoi.mongodb.net/Recipe-filter",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("mongoDB Connected")) //return fullfiled promise
  .catch((err) => console.log(err)); //return rejected promise

app.use("/", route);

//port is two-way communication link between two programs running on the network
app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});