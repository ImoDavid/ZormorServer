const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
require("dotenv").config();




app.use(
  fileUpload({
    useTempFiles: true,
    limit: { fileSize: 6 * 1024 * 1024 },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//route
const apiRoute = require("./route/api");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));


// routing is done here
app.use("/api", apiRoute);

//error handling

app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('pages-404', {
      title: '404 Error',
      layout: 'layout/layout-without-navbar',
    });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.use(function (req, res, next) {
  res.status(500);

  // respond with html page
  if (req.accepts('html')) {
    res.render('pages-500', {
      title: '500 Error',
      layout: 'layout/layout-without-navbar',
    });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Server Error' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Server Error');
});

module.exports = app;
