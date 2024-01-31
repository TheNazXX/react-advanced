import { buildSassLoader } from './loaders/buildSassLoader'

export function buildLoaders (isDev: boolean): any[] {
  const SvgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack']
  }

  const FileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  }

  const TSLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  }

  const BabelLoader = {
    test: /\.(js|jsx|tsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  }

  return [
    FileLoader,
    SvgLoader,
    BabelLoader,
    TSLoader,

    buildSassLoader(isDev)
  ]
};
