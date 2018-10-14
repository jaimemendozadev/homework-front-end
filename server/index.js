const express = require("express");
const path = require("path");

const app = express();

const staticAssets = path.resolve(__dirname, "../public");
const indexHTML = path.resolve(__dirname, "../public/index.html");

app.use(express.static(staticAssets));
app.use("*", (req, res) => res.sendFile(indexHTML));

module.exports = app;
