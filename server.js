require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connection;
const mongoURI = process.env.MONGOURI;

// conteroller variable 
const companyController = require("./controllers/companies")
const orderController = require("./controllers/orders")


// using method override for the put 
const methodOverride = require("method-override");

const PORT = process.env.PORT || 5000;

// this is parsing the data
app.use(express.urlencoded({ extended: true }));
// this overridingthe method
app.use(methodOverride("_method"));
// using the static files
app.use(express.static("public"));
// models

const Order = require("./models/Order")
const Company = require("./models/Company")




mongoose.connect(mongoURI, () => {
    console.log("The connection with mongod is established");
  });
  
  // Error / success
  db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
  db.on("connected", () => console.log("mongo connected: ", mongoURI));
  db.on("disconnected", () => console.log("mongo disconnected"));



//   controller middleware
app.use('/companies', companyController);
app.use('/orders', orderController);


  app.get("/", (req, res) => {

        Order.find().sort({ pickUpDay: 1 }).populate("company").exec((err, data)=>{
      console.log(data)
          res.render("index.ejs", {orders: data});
        })
        
  });

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
  