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
  // مسیرهای پروژه
  projectRoot: root,

  // پوشه‌هایی که Metro باید watch کند
  watchFolders: [
    root,
    myappDir,
    path.resolve(root, 'node_modules'),
    path.resolve(myappDir, 'node_modules'),
  ],

  // تنظیمات resolver
  resolver: {
    // مسیرهای اضافی برای جستجوی ماژول‌ها
    extraNodeModules: {
      'react': path.resolve(root, 'node_modules/react'),
      'react-native': path.resolve(root, 'node_modules/react-native'),
      '@react-native': path.resolve(root, 'node_modules/@react-native'),
      '@react-native-community': path.resolve(
        root,
        'node_modules/@react-native-community'
      ),
      '@react-native-async-storage': path.resolve(
        root,
        'node_modules/@react-native-async-storage'
      ),
      '@react-native-camera-roll': path.resolve(
        root,
        'node_modules/@react-native-camera-roll'
      ),
      '@react-native-clipboard': path.resolve(
        root,
        'node_modules/@react-native-clipboard'
      ),
      '@react-native-picker': path.resolve(
        root,
        'node_modules/@react-native-picker'
      ),
      'react-native-gesture-handler': path.resolve(
        root,
        'node_modules/react-native-gesture-handler'
      ),
      'react-native-reanimated': path.resolve(
        root,
        'node_modules/react-native-reanimated'
      ),
      'react-native-safe-area-context': path.resolve(
        root,
        'node_modules/react-native-safe-area-context'
      ),
      'react-native-screens': path.resolve(
        root,
        'node_modules/react-native-screens'
      ),
      'react-native-svg': path.resolve(root, 'node_modules/react-native-svg'),
      'react-native-vector-icons': path.resolve(
        root,
        'node_modules/react-native-vector-icons'
      ),
      'react-native-vision-camera': path.resolve(
        root,
        'node_modules/react-native-vision-camera'
      ),
      'react-native-device-info': path.resolve(
        root,
        'node_modules/react-native-device-info'
      ),
      'react-native-fs': path.resolve(root, 'node_modules/react-native-fs'),
      'react-native-blob-util': path.resolve(
        root,
        'node_modules/react-native-blob-util'
      ),
      'react-native-image-picker': path.resolve(
        root,
        'node_modules/react-native-image-picker'
      ),
      'react-native-permissions': path.resolve(
        root,
        'node_modules/react-native-permissions'
      ),
      'react-native-share': path.resolve(
        root,
        'node_modules/react-native-share'
      ),
      'react-native-mmkv': path.resolve(root, 'node_modules/react-native-mmkv'),
      'react-native-worklets-core': path.resolve(
        root,
        'node_modules/react-native-worklets-core'
      ),
    },

    // فایل‌هایی که باید به عنوان asset شناخته شوند
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

    // فایل‌هایی که باید به عنوان source شناخته شوند
    sourceExts: [
      'js',
      'jsx',
      'json',
      'ts',
      'tsx',
      'cjs',
      'mjs',
    ],

    // غیرفعال کردن haste map برای node_modules
    disableHierarchicalLookup: false,

    // resolver اصلی
    resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],

    // استفاده از platform-specific extensions
    platforms: ['android', 'ios', 'native'],

    // غیرفعال کردن symlink resolution برای performance بهتر
    unstable_enableSymlinks: false,

    // resolver برای development
    resolveRequest: (context, moduleName, platform) => {
      // لاگ ماژول‌های resolve شده در حالت development
      if (process.env.METRO_DEBUG === 'true') {
        console.log(`[Metro] Resolving: ${moduleName} (${platform})`);
      }

      // resolver پیش‌فرض
      return context.resolveRequest(context, moduleName, platform);
    },
  },

  // تنظیمات transformer
  transformer: {
    // مسیر babel config
    babelTransformerPath: require.resolve(
      'react-native/Libraries/Transformer/reactNativeTransformer.js'
    ),

    // تنظیمات babel
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),

    // تنظیمات minifier
    minifierConfig: {
      mangle: {
        toplevel: false,
      },
      compress: {
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        hoist_vars: false,
        if_return: true,
        join_vars: true,
        cascade: true,
        collapse_vars: true,
        reduce_vars: true,
        warnings: false,
        negate_iife: true,
        pure_getters: true,
        pure_funcs: [],
        drop_console: process.env.NODE_ENV === 'production',
        expression: false,
        keep_fargs: true,
        keep_fnames: false,
        passes: 2,
        keep_infinity: false,
        side_effects: true,
        global_defs: {
          __DEV__: process.env.NODE_ENV !== 'production',
        },
      },
      output: {
        ascii_only: true,
        quote_style: 3,
        wrap_iife: true,
        preamble: '/* My Dynamic App - Built with React Native + Hermes */',
      },
    },

    // غیرفعال کردن source map در production
    enableBabelRCLookup: true,

    // تنظیمات Hermes
    hermesParser: true,

    // تنظیمات asset registry
    assetRegistryPath: 'react-native/Libraries/Image/AssetRegistry',

    // تنظیمات public path
    publicPath: '/assets',
  },

  // تنظیمات serializer
  serializer: {
    // polyfill های مورد نیاز
    getPolyfills: () => {
      return [
        require.resolve('react-native/Libraries/polyfills/Object.es7.js'),
        require.resolve('react-native/Libraries/polyfills/console.js'),
        require.resolve('react-native/Libraries/polyfills/error-guard.js'),
        require.resolve('react-native/Libraries/polyfills/Number.es6.js'),
        require.resolve('react-native/Libraries/polyfills/String.prototype.es6.js'),
        require.resolve('react-native/Libraries/polyfills/Array.prototype.es6.js'),
        require.resolve('react-native/Libraries/polyfills/Array.es6.js'),
        require.resolve('react-native/Libraries/polyfills/Object.es6.js'),
        require.resolve('react-native/Libraries/polyfills/babelHelpers.js'),
      ];
    },

    // process module filter
    processModuleFilter: (module) => {
      const modulePath = module.path;

      // فیلتر ماژول‌های غیرضروری
      if (
        typeof modulePath === 'string' &&
        modulePath.includes('node_modules') &&
        (modulePath.includes('__tests__') ||
          modulePath.includes('__mocks__') ||
          modulePath.includes('test') ||
          modulePath.includes('spec'))
      ) {
        return false;
      }

      return true;
    },

    // custom serializer
    customSerializer: null,

    // polyfill module ids
    polyfillModuleNames: [],

    // غیرفعال کردن lazy loading برای bundle اصلی
    isThirdPartyModule: (module) => {
      return (
        typeof module.path === 'string' &&
        module.path.includes('node_modules')
      );
    },
  },

  // تنظیمات server
  server: {
    // پورت سرور Metro
    port: 8081,

    // فعال کردن HTTPS
    https: false,

    // مسیر certificate (برای HTTPS)
    // key: path.resolve(root, 'ssl/key.pem'),
    // cert: path.resolve(root, 'ssl/cert.pem'),

    // فعال کردن CORS
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PUT, DELETE, OPTIONS'
        );
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization'
        );

        // لاگ درخواست‌ها در حالت development
        if (process.env.METRO_DEBUG === 'true') {
          console.log(`[Metro Server] ${req.method} ${req.url}`);
        }

        return middleware(req, res, next);
      };
    },

    // غیرفعال کردن compression برای development سریع‌تر
    compression: false,

    // timeout برای درخواست‌ها
    timeout: 30000,
  },

  // تنظیمات watcher
  watcher: {
    // استفاده از watchman اگر موجود باشد
    useWatchman: true,

    // فاصله زمانی بین بررسی تغییرات
    watchmanDeferStates: [],

    // health check interval
    healthCheckInterval: 30000,

    // health check timeout
    healthCheckTimeout: 5000,

    // crawl timeout
    crawlTimeout: 300000,

    // max parallel crawls
    maxParallelCrawls: 2,

    // enable recursive watching
    recursive: true,

    // ignore patterns
    ignorePattern: /node_modules\/.*\/node_modules/,
  },

  // تنظیمات cache
  cacheStores: [
    {
      // استفاده از حافظه موقت فایل سیستم
      type: 'fs',
      root: path.resolve(root, '.metro-cache'),
    },
  ],

  // تنظیمات cache version
  cacheVersion: '1.0.0',

  // reset cache
  resetCache: false,

  // max workers
  maxWorkers: 4,

  // گزارش‌دهی
  reporter: {
    update: (event) => {
      if (process.env.METRO_DEBUG === 'true') {
        switch (event.type) {
          case 'bundle_build_started':
            console.log('[Metro] Bundle build started...');
            break;
          case 'bundle_transform_progressed':
            console.log(
              `[Metro] Transforming: ${event.transformedFileCount}/${event.totalFileCount}`
            );
            break;
          case 'bundle_build_done':
            console.log('[Metro] Bundle build completed!');
            break;
          case 'bundle_build_failed':
            console.error('[Metro] Bundle build failed!');
            break;
          default:
            break;
        }
      }
    },
  },

  // غیرفعال کردن telemetry
  telemetry: {
    enabled: false,
  },

  // تنظیمات unstable
  unstable: {
    // فعال کردن module system جدید
    enableModuleSystem: false,

    // فعال کردن lazy imports
    lazyImports: false,

    // تنظیمات symlink
    enableSymlinks: false,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
