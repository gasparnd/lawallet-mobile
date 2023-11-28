module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: false,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          components: './app/components',
          ui: './app/ui/index',
          screens: './app/screens',
          navigation: './app/navigation',
          lib: './app/lib',
          constants: './app/constants',
          context: './app/context',
          hooks: './app/hooks',
        },
      },
    ],
  ],
};
