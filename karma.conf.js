module.exports = function karma(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'sinon'],
    files: ['tests.webpack.js'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-mocha-reporter'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        preLoaders: [
          {
            test: /\.js$/,
            exclude: /(__tests__|node_modules)\//,
            loader: 'isparta-instrumenter'
          }
        ],
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules|lib)\//
          }
        ]
      },
      externals: {
        cheerio: 'window',
        'react/addons': true,
        'react/lib/ReactContext': true,
        'react/lib/ExecutionEnvironment': true
      }
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      reporters: [
        {
          type: 'lcovonly',
          dir: 'coverage/',
          subdir: '.',
          file: 'lcov.info'
        },
        {
          type: 'text'
        }
      ]
    }
  });
};
