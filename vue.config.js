const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devServer: {
      host: '0.0.0.0',
      port: '8080',
      disableHostCheck: true,
    },
    plugins: [
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // include specific files based on a RegExp
        include: /src/,
        // add errors to webpack instead of warnings
        failOnError: false,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
      }),
    ],
  },
};
