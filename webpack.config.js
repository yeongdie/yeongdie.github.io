const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === "production";
const serverPath = process.cwd();
const wwwPath = /Windows/.test(process.env.OS)
  ? path.resolve("/", "inetpub", "wwwroot")
  : path.resolve("/", "Users", "jenny", "www");
const distPath = isProduction
  ? path.resolve(serverPath, "asset")
  : path.resolve(wwwPath, "yeongdie", "asset");
const srcPath = path.resolve(serverPath, "src");

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: { index: path.resolve(srcPath, "index.js") },
  devtool: isProduction ? "none" : "cheap-module-source-map",
  output: {
    path: distPath,
    publicPath: isProduction ? "/asset/" : "./asset/",
    chunkFilename: isProduction
      ? "[contenthash].min.js"
      : "[name].bundle.js?[hash]",
    filename: isProduction ? "[contenthash].min.js" : "[name].bundle.js?[hash]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"]
            }
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { modules: true } },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: isProduction
                ? "[contenthash:20].min.[ext]"
                : "[name].[ext]?[hash]",
              limit: "2048"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "@src": srcPath
    }
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new HtmlWebpackPlugin({
      filename: "../index.html",
      title: "yeong die",
      favicon: path.resolve(srcPath, "fav.ico"),
      meta: {
        charset: "utf-8",
        viewport: "width=device-width,initial-scale=1.0",
        "og:title": "die 2019",
        "og:type": "website",
        "og:url": "https://yeongdie.github.io",
        "og:description": "document for good bye"
      }
    }),
    new MiniCssExtractPlugin({
      chunkFilename: isProduction
        ? "[contenthash].min.css"
        : "[name].bundle.css?[hash]",
      filename: isProduction
        ? "[contenthash].min.css"
        : "[name].bundle.css?[hash]"
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(distPath, "**", "*")],
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false,
      verbose: true
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "all",
          name: "vendor",
          filename: isProduction
            ? "[contenthash].min.js"
            : "[name].bundle.js?[hash]"
        }
      }
    }
  }
};
