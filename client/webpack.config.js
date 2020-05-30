const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]---[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [autoprefixer()],
            },
          },
        ],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: "file-loader",
          },
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
              ],
            },
          },
        ],
        exclude: [path.resolve("node_modules")],
      },
    ],
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".js", ".ts", ".sass", ".scss", ".css"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo List",
      filename: "index.html",
      template: "./src/template/index.html",
      inject: false,
    }),
  ],
};
