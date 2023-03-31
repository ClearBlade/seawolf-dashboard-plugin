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
    externals: [
      '@clearblade/ia-mfe-core',
      '@clearblade/ia-mfe-react',
      'react-query',
      '@material-ui/core',
      '@material-ui/icons',
      '@material-ui/lab',
      'react-router-dom',
    ],
  });
};
