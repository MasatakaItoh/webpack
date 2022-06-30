const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.css/,
        // 下から順に実行される
        use: [
          // JavaScript内のCSSをDOMに挿入する
          // {
          //   loader: "style-loader",
          // },
          // CSSを別ファイルに出力する
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSSをJavaScriptに読み込む
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    // CSSを別ファイルに出力する
    new MiniCssExtractPlugin(),
    // HTMLファイルを生成する
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // buildのたびに、output.pathディレクトリ内のすべてのファイルを削除する
    new CleanWebpackPlugin(),
  ],
}
