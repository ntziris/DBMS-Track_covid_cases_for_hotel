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

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
  console.log("Server started on Port 5000");
});
