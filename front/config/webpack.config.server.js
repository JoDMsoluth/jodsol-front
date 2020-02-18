const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const nodeExternals = require('webpack-node-externals');

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.exports = {
  mode: 'production',
  entry: paths.ssrEntry,
  target: 'node',
  output: {
    path: paths.ssrBuild,
    filename: 'render.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.PNG$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              emitFile: false,
              name: 'static/image/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
              cacheDirectory: true, // build를 빠르게 하기 위해 전에 build 했다면 캐쉬로 저장함
            },
          },
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            loader: require.resolve('css-loader'),
            options: {
              onlyLocals: true,
            },
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: /\.module\.css$/,
            loader: require.resolve('css-loader'),
            options: {
              onlyLocals: true,
              module: true,
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
          {
            test: /\.(scss|sass)$/,
            exclude: /\.module\.(scss|sass)$/,
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  onlyLocals: true,
                },
              },
              require.resolve('sass-loader'),
            ],
          },
          {
            test: /\.module\.(scss|sass)$/,
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  onlyLocals: true,
                  module: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              require.resolve('sass-loader'),
            ],
          },
          {
            test: /\.(PNG|png|jpe?g|gif)$/i,
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              emitFile: false, // 파일은 따로 만들지 않음.. s3에 저장하기 때문
              name: 'static/image/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
    ),
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new webpack.NormalModuleReplacementPlugin(/hello/, 'fakeModule'),
  ],
};
