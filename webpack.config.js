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
  // webpack-dev-server用の設定
  devServer: {
    watchFiles: ['src/**/*.pug', 'src/**/*.scss'],
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
        test: /\.(css|sass|scss)/,
        use: [
          // JavaScript内のCSSをDOMに挿入する or CSSを別ファイルに出力する
          {
            loader: isInlineCss ? "style-loader" : MiniCssExtractPlugin.loader,
          },
          // CSSをJavaScriptに読み込む
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
          // TODO Autoprefixerの対応
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
