/**
 * Metro configuration for React Native
 * https://reactnative.dev/docs/metro
 *
 * @format
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const root = path.resolve(__dirname);
const myappDir = path.resolve(__dirname, 'myapp');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  projectRoot: root,

  watchFolders: [
    root,
    myappDir,
    path.resolve(root, 'node_modules'),
  ],

  resolver: {
    extraNodeModules: {
      'react': path.resolve(root, 'node_modules/react'),
      'react-native': path.resolve(root, 'node_modules/react-native'),
      '@react-native': path.resolve(root, 'node_modules/@react-native'),
      '@react-native-community': path.resolve(root, 'node_modules/@react-native-community'),
      '@react-native-async-storage': path.resolve(root, 'node_modules/@react-native-async-storage'),
      '@react-native-camera-roll': path.resolve(root, 'node_modules/@react-native-camera-roll'),
      '@react-native-clipboard': path.resolve(root, 'node_modules/@react-native-clipboard'),
      '@react-native-picker': path.resolve(root, 'node_modules/@react-native-picker'),
      'react-native-gesture-handler': path.resolve(root, 'node_modules/react-native-gesture-handler'),
      'react-native-reanimated': path.resolve(root, 'node_modules/react-native-reanimated'),
      'react-native-safe-area-context': path.resolve(root, 'node_modules/react-native-safe-area-context'),
      'react-native-screens': path.resolve(root, 'node_modules/react-native-screens'),
      'react-native-svg': path.resolve(root, 'node_modules/react-native-svg'),
      'react-native-vector-icons': path.resolve(root, 'node_modules/react-native-vector-icons'),
      'react-native-vision-camera': path.resolve(root, 'node_modules/react-native-vision-camera'),
      'react-native-device-info': path.resolve(root, 'node_modules/react-native-device-info'),
      'react-native-fs': path.resolve(root, 'node_modules/react-native-fs'),
      'react-native-blob-util': path.resolve(root, 'node_modules/react-native-blob-util'),
      'react-native-image-picker': path.resolve(root, 'node_modules/react-native-image-picker'),
      'react-native-permissions': path.resolve(root, 'node_modules/react-native-permissions'),
      'react-native-share': path.resolve(root, 'node_modules/react-native-share'),
      'react-native-mmkv': path.resolve(root, 'node_modules/react-native-mmkv'),
      'react-native-worklets-core': path.resolve(root, 'node_modules/react-native-worklets-core'),
    },

    sourceExts: [
      'js',
      'jsx',
      'json',
      'ts',
      'tsx',
      'cjs',
      'mjs',
    ],

    assetExts: [
      'bmp',
      'gif',
      'jpg',
      'jpeg',
      'png',
      'psd',
      'svg',
      'webp',
      'm4v',
      'mov',
      'mp4',
      'mpeg',
      'mpg',
      'webm',
      'aac',
      'aiff',
      'caf',
      'm4a',
      'mp3',
      'wav',
      'html',
      'pdf',
      'yaml',
      'yml',
      'otf',
      'ttf',
      'zip',
    ],

    platforms: ['android', 'ios', 'native'],

    resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },

  serializer: {
    processModuleFilter: (module) => {
      const modulePath = module.path;

      if (
        typeof modulePath === 'string' &&
        modulePath.includes('node_modules') &&
        (modulePath.includes('__tests__') ||
          modulePath.includes('__mocks__') ||
          modulePath.includes('/test/') ||
          modulePath.includes('/spec/'))
      ) {
        return false;
      }

      return true;
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
