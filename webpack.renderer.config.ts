import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import { alias } from "./webpack.alias";

rules.push({
  test: /\.(css|scss)$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "sass-loader", options: { implementation: require("sass") } },
  ],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss"],
    alias,
  },
};
