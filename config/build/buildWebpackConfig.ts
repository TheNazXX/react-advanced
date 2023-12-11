import webpack from 'webpack';
import { BuildOptions } from "./types/config";

import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolves } from './buildResolve';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig({paths, mode, port, isDev}: BuildOptions): webpack.Configuration{

  return {
    mode: mode,
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: 'bundle.[contenthash].js',
      clean: true
    },
    plugins: buildPlugins(paths.html),
    module: {
      rules: buildLoaders()
    },
    resolve: buildResolves(),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(port) : undefined
  }
  
};