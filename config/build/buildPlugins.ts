import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export function buildPlugins(path: string): webpack.WebpackPluginInstance[]{
  return [
    new HtmlWebpackPlugin({
      template: path
    }),
    new webpack.ProgressPlugin()
  ]
};