'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const environment = EmberApp.env();
const IS_PROD = environment === 'production';

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    sourcemaps: {
      enabled: IS_PROD,
      extensions: ['js'],
    },

    'ember-cli-babel': {
      includePolyfill: IS_PROD,
    },

    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
      generateAssetMap: true,
      fingerprintAssetMap: true,
      inline: true,
      enabled: IS_PROD,
      prepend: IS_PROD ? `${process.env.URL}/` : '/',
    },

    autoImport: {
      forbidEval: true,
      webpack: {
        node: {
          global: false,
          __filename: false,
          __dirname: false,
        },
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
      },
      pubicAssetURL: IS_PROD ? `${process.env.URL}/assets` : undefined,
    },

    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapFont: false,
      importBootstrapCSS: false,
    },

    emberApolloClient: {
      keepGraphqlFileExtension: false,
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
