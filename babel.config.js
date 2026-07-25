module.exports = {
  presets: [
    'module:@react-native/babel-preset',
  ],
  plugins: [
    // پشتیبانی از Reanimated (باید آخرین پلاگین باشد)
    'react-native-reanimated/plugin',

    // پشتیبانی از optional chaining و nullish coalescing
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-transform-nullish-coalescing-operator',

    // پشتیبانی از class properties
    ['@babel/plugin-proposal-class-properties', { loose: true }],

    // پشتیبانی از decorators
    ['@babel/plugin-proposal-decorators', { legacy: true }],

    // پشتیبانی از export namespace
    '@babel/plugin-proposal-export-namespace-from',

    // پشتیبانی از numeric separator
    '@babel/plugin-proposal-numeric-separator',

    // پشتیبانی از throw expressions
    '@babel/plugin-proposal-throw-expressions',

    // تبدیل inline requires برای بهبود performance
    'transform-inline-environment-variables',

    // پشتیبانی از path aliases
    [
      'module-resolver',
      {
        root: ['./myapp'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@components': './myapp/src/components',
          '@screens': './myapp/src/screens',
          '@navigation': './myapp/src/navigation',
          '@utils': './myapp/src/utils',
          '@hooks': './myapp/src/hooks',
          '@services': './myapp/src/services',
          '@assets': './myapp/src/assets',
          '@styles': './myapp/src/styles',
          '@constants': './myapp/src/constants',
          '@types': './myapp/src/types',
          '@config': './myapp/src/config',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        // حذف console.log در حالت production
        'transform-remove-console',

        // بهینه‌سازی bundle
        'minify-dead-code-elimination',
      ],
    },
    development: {
      plugins: [
        // اضافه کردن stack trace بهتر در حالت development
        'transform-remove-console',
      ],
    },
  },
};
