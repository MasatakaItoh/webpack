const path = require("path");

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
          {
            loader: "style-loader",
          },
          // CSSをJavaScriptに読み込む
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
}
