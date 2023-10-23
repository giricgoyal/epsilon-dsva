/** ===============================================
 * Author: Epsilon DSVA Team
 * 
 * NOTE: This test and all associated code and data
 * are confidential and are not to be shared with 
 * anyone outside of the Epsilon DSVA team.
 * 
 =================================================*/

require("dotenv").config();

const nodeExternals = require("webpack-node-externals");

const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const path = require("path");

const { NODE_ENV = "development" } = process.env;

module.exports = {
  mode: NODE_ENV,
  watch: NODE_ENV === "development",
  target: "node",
  entry: "./api/index.ts",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "api"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new WebpackShellPluginNext({
      onBuildEnd:
        NODE_ENV === "development"
          ? { scripts: ["yarn watch:server"], parallel: true }
          : {},
    }),
  ],
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
};
