const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === "production";
const serverPath = process.cwd();
const wwwPath = /Windows/.test(process.env.OS)
  ? path.resolve("/", "inetpub", "wwwroot")
  : path.resolve(process.env.HOME, "www");
const distPath = isProduction
  ? path.resolve(serverPath, "asset")
  : path.resolve(wwwPath, "yeongdie", "asset");
const srcPath = path.resolve(serverPath, "src");

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: { index: path.resolve(srcPath, "index.js") },
  devtool: isProduction ? false : "cheap-module-source-map",
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
              presets: [
                "@babel/preset-react",
                [
                  "@babel/preset-env",
                  {
                    corejs: "3",
                    useBuiltIns: "usage",
                    modules: "commonjs"
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                noEmit: false
              }
            }
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
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom"
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
