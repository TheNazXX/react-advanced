import type webpack from 'webpack'
import { type BuildOptions } from './types/config'

import { buildPlugins } from './buildPlugins'
import { buildLoaders } from './buildLoaders'
import { buildResolves } from './buildResolve'
import { buildDevServer } from './buildDevServer'

export function buildWebpackConfig ({ paths, mode, port, isDev, apiUrl, project }: BuildOptions): webpack.Configuration {
  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: 'bundle.[contenthash].js',
      clean: true,
      publicPath: '/'
    },
    plugins: buildPlugins(paths.html, isDev, apiUrl, project),
    module: {
      rules: buildLoaders(isDev)
    },
    resolve: buildResolves(paths.src),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(port) : undefined
  }
};
