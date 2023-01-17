const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'seawolf',
    projectName: 'dashboard-plugin',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: ['microfrontendUtils', 'react-query'],
  });
};
