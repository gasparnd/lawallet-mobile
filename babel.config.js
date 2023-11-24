module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          components: './app/components',
          screens: './app/screens',
          navigation: './app/navigation',
          constants: './app/constants',
          context: './app/context',
        },
      },
    ],
  ],
};
