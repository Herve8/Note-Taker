// Importing dependencies to return a function reference
const express = require("express");
const path = require("path");
const fs = require("fs");

// instantiating express() and assigns serverApp to it
const serverApp = express();

// Setting the default port listener for Heroku or use port 3000
const PORT = process.env.PORT || 3000;

//  create variable createNoteTextand assign an array to it
let createNoteText = [];

// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
//This method is called as a middleware
serverApp.use(express.json());
serverApp.use(
  //express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
  express.urlencoded({
    extended: true,
  })
);
//Code to serve images, CSS files, and JavaScript files in a directory named public
serverApp.use(express.static(path.join(__dirname, "public")));

// Route for sending all the concordance data which takes the error and response parameters
serverApp.get("/api/notes", function (err, res) {
  try {
    createNoteText = fs.readFileSync("db/db.json", "utf8");
    console.log("Hello from the SERVER!");
    createNoteText = JSON.parse(createNoteText);
  } catch (err) {
    console.log("\n error (catch err serverApp.get):");
    console.log(err);
  }
  res.json(createNoteText);
});

// A route for all new notes being created
serverApp.post("/api/notes", function (req, res) {
  try {
    createNoteText = fs.readFileSync("./db/db.json", "utf8");
    console.log(createNoteText);
    createNoteText = JSON.parse(createNoteText);
    req.body.id = createNoteText.length;
    createNoteText.push(req.body);
    createNoteText = JSON.stringify(createNoteText);
    fs.writeFile("./db/db.json", createNoteText, "utf8", function (err) {
      if (err) throw err;
    });
    //Express is stringifying the JSON response 
    res.json(JSON.parse(createNoteText));
  } catch (err) {
    throw err;
    console.error(err);
  }
});

// Server code to delete notes which takes the request and response parameters
serverApp.delete("/api/notes/:id", function (req, res) {
  try {
    createNoteText = fs.readFileSync("./db/db.json", "utf8");
    createNoteText = JSON.parse(createNoteText);
    createNoteText = createNoteText.filter(function (note) {
      return note.id != req.params.id;
    });
    //The JSON.stringify() method converts a JavaScript object or value to a JSON string
    createNoteText = JSON.stringify(createNoteText);
    //Create a new file using the writeFile() method 
    //Writing data to createNoteText, encoding the file to utf8 and saving it to the db.json file 
    fs.writeFile("./db/db.json", createNoteText, "utf8", function (err) {
      if (err) throw err;
    });
    //Sending a response by calling the res.send() method
    res.send(JSON.parse(createNoteText));
  } catch (err) {
    throw err;
    console.log(err);
  }
});

// Using the get method
serverApp.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// path.join(__dirname, 'public') will create an absolute path, using the directory 
serverApp.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
//app.get('/api/notes/:id')will handle all HTTP GET requests
serverApp.get("/api/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "db/db.json"));
});

// Start the server on the port and create a message when the server connection is on
serverApp.listen(PORT, function () {
  console.log("SERVER IS LISTENING: " + PORT);
});