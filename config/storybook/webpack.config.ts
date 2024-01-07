import path from 'path'
import { type BuildPaths } from '../build/types/config'
import type webpack from 'webpack'
import { buildSassLoader } from '../build/loaders/buildSassLoader'

export default ({ config }: { config: webpack.Configuration }): webpack.Configuration => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src')
  }

  config.resolve.modules.push(paths.src)
  config.resolve.extensions.push('.ts', '.tsx')
  config.module.rules.push(buildSassLoader(true))

  return config
}
