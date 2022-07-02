const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isInlineCss = false;

module.exports = {
  entry: "./src/js/script.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/script.js",
  },
  module: {
    rules: [
      {
        test: /\.pug/,
        use: [
          {
            loader: "html-loader",
          },
          // pugファイルをHTMLに変換する
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.css/,
        use: [
          // JavaScript内のCSSをDOMに挿入する or CSSを別ファイルに出力する
          {
            loader: isInlineCss ? "style-loader" : MiniCssExtractPlugin.loader,
          },
          // CSSをJavaScriptに読み込む
          {
            loader: "css-loader",
          },
        ],
      },
      // 画像ファイルの依存関係を解決する
      {
        test: /\.(jpg|png|svg|gif)/,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    // CSSを別ファイルに出力する
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    // HTMLファイルを生成する
    new HtmlWebpackPlugin({
      template: "./src/templates/index.pug",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/access.pug",
      filename: "access.html",
    }),
    // buildのたびに、output.pathディレクトリ内のすべてのファイルを削除する
    new CleanWebpackPlugin(),
  ],
}
