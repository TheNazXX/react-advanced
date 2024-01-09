import path from 'path'
import { type BuildPaths } from '../build/types/config'
import type webpack from 'webpack'
import { buildSassLoader } from '../build/loaders/buildSassLoader'
import { type RuleSetRule } from 'webpack'

export default ({ config }: { config: webpack.Configuration }): webpack.Configuration => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src')
  }

  config.resolve.modules.push(paths.src)
  config.resolve.extensions.push('.ts', '.tsx')

  config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return {
        ...rule, exclude: /\.svg$/i
      }
    }

    return rule
  })

  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack']
  })

  config.module.rules.push(buildSassLoader(true))

  return config
}
