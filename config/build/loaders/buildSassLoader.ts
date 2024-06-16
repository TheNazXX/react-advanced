import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildSassLoader(isDev: boolean): Record<string, any> {
  return {
    test: /\.s?css$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes(".module")),
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
          },
        },
      },
      "postcss-loader",
      "sass-loader",
    ],
  };
}
