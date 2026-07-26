const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const root = path.resolve(__dirname);

const config = {
  watchFolders: [root],

  resolver: {
    blockList: [/myapp[\/\\]node_modules[\/\\].*/],
    extraNodeModules: {
      'react': path.resolve(root, 'node_modules/react'),
      'react-native': path.resolve(root, 'node_modules/react-native'),
    },
  },

  serializer: {
    getModulesRunBeforeMainModule: () => [
      path.resolve(root, 'node_modules/react-native/Libraries/Core/InitializeCore.js'),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
