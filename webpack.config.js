const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";
const serverPath = process.cwd();
const distPath = isProduction
  ? path.resolve(serverPath, "js")
  : path.resolve("/", "inetpub", "wwwroot", "yeongdie", "js");
const srcPath = path.resolve(serverPath, "src");

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: { index: path.resolve(srcPath, "index.js") },
  output: {
    path: distPath,
    publicPath: isProduction ? "/js/" : "./js/",
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
          },
          {
            loader: "source-map-loader"
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: isProduction ? "/css/" : "./css/"
            }
          },
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
              limit: "2048",
              outputPath: "..",
              publicPath: isProduction ? "/" : "./"
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
    new HtmlWebpackPlugin({
      filename: "../index.html",
      title: ""
    }),
    new MiniCssExtractPlugin({
      chunkFilename: isProduction
        ? "../css/[contenthash].min.css"
        : "../css/[name].bundle.css?[hash]",
      filename: isProduction
        ? "../css/[contenthash].min.css"
        : "../css/[name].bundle.css?[hash]"
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve(
          distPath,
          "..",
          "**",
          isProduction ? "*.min.*" : "*.bundle.*"
        )
      ],
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false,
      verbose: true
    })
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]react/,
          chunks: "all",
          name: "react",
          filename: isProduction
            ? "[contenthash].min.js"
            : "[name].bundle.js?[hash]"
        },
        vendor: {
          test: /[\\/]node_modules[\\/](?!react)/,
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
