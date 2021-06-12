const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

// Configure dotenv
dotenv.config({ path: './.env' });

// Express
const app = express();

// Configure DB
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});


// Configure public Directory
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Template engine - handlebars
app.set('view engine', 'hbs')

// Connect to DB
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL Connected...");
  }
})

app.get("/", (req, res) => {
  // res.send("<h1>Home Page!</h1>");
  res.render("index")
});

app.listen(5000, () => {
  console.log("Server started on Port 5000");
});
