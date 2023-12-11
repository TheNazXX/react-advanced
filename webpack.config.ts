import path from 'path';
import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildPaths } from './config/build/types/config';

const paths: BuildPaths = {
  build: path.resolve(__dirname, 'dist'),
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  html: path.resolve(__dirname, 'public', 'index.html')
}

const mode = 'development';
const isDev = mode === 'development';

const config: webpack.Configuration = buildWebpackConfig({
  mode,
  paths,
  isDev
  
})

export default config;