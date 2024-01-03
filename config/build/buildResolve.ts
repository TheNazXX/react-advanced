import { type ResolveOptions } from 'webpack'

export function buildResolves (src: string): ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    mainFiles: ['index'],
    modules: [
      src, 'node_modules'
    ]
  }
};
