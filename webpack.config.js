const path = require("path");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entry = path.resolve(__dirname, "./src/index.jsx");
const publicPath = path.resolve(__dirname, "./public");

module.exports = {
  entry,
  output: {
    path: publicPath,
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.js?x/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.(gif|svg|png|jpe?g)$/, loader: "file-loader" },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({ filename: "styles.css" }), new Dotenv()]
};
