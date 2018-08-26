module.exports = require('babel-jest').createTransformer({
  presets: [
    [
      'env',
      {
        modules: false,
      }
    ],
    'react',
  ],
  plugins: ['transform-class-properties', 'transform-object-rest-spread'],
});
