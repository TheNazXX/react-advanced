import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export function buildPlugins (path: string, isDev: boolean): webpack.WebpackPluginInstance[] {
  const plugins = [
    new HtmlWebpackPlugin({
      template: path
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev)
    })
  ]


  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin()),

    plugins.push(new BundleAnalyzerPlugin({
      openAnalyzer: true,
      analyzerHost: '127.0.0.2',
      excludeAssets: /node_modules/
    }))
  }

  return plugins
};
