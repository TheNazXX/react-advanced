import path from 'path';
import type webpack from 'webpack';
import { DefinePlugin, RuleSetRule } from 'webpack';
import { BuildPaths } from '../build/types/config';
import { buildSassLoader } from '../build/loaders/buildSassLoader';

export default ({ config }: { config: webpack.Configuration }): webpack.Configuration => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src')
  };

  if (config.resolve && config.resolve.modules) {
    config.resolve.modules.push(paths.src);
  }

  if (config.resolve && config.resolve.extensions) {
    config.resolve.extensions.push('.ts', '.tsx');
  }

  if (config.module && config.module.rules) {
    config.module.rules = config.module.rules.map((rule: any) => {
      if (/svg/.test(String(rule.test))) {
        return {
          ...rule,
          exclude: /\.svg$/i
        };
      }

      return rule;
    });

    config.module.rules = config.module.rules.map((rule: any) => {
      if (/css/.test(String(rule.test))) {
        return {
          ...rule,
          use: []
        };
      }

      return rule;
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
  }

  if (config.plugins) {
    config.plugins.push(new DefinePlugin({
      __IS_DEV__: true,
      __API__: JSON.stringify(''),
      __PROJECT__: JSON.stringify('storybook') 
    }));
  }

  if (config.module && config.module.rules) {
    config.module.rules.push(buildSassLoader(true));
  }

  return config;
};