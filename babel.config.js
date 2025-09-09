module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      // Required for react-native-reanimated
      'react-native-reanimated/plugin',
    ],
  };
};