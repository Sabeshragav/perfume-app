// config-overrides.js
module.exports = function override(config, env) {
    // Modify the Webpack configuration to ignore source map warnings for lucide-react
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
      exclude: /node_modules\/lucide-react/, // Exclude lucide-react
    });
    return config;
  };
  