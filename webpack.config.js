/** ===============================================
 * Author: Epsilon DSVA Team
 * 
 * NOTE: This test and all associated code and data
 * are confidential and are not to be shared with 
 * anyone outside of the Epsilon DSVA team.
 * 
 =================================================*/

require("dotenv").config();

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");

const {
  NODE_ENV = "development",
  REACT_PORT = 9000,
  API_PORT = 3000,
} = process.env;

module.exports = {
  mode: NODE_ENV,
  entry: "./app/index.tsx",
  devtool: "inline-source-map",
  devServer: {
    // contentBase: "./dist/public",
    hot: true,
    port: REACT_PORT,
    proxy: {
      "/api": `http://localhost:${API_PORT}`,
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "My Application",
      template: "./app/index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist/public"),
  },
};
