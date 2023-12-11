export function buildLoaders(){

  const TSLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };


  return [
    TSLoader
  ]
};