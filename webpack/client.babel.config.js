module.exports = {
  babelrc: false,
  cacheDirectory: true,
  presets: [
    [
      'env',
      {
        modules: false,
        targets: {
          browsers: ['last 5 versions', 'ie >= 11']
        }
      }
    ],
    'react',
  ],
  plugins: [
    'transform-object-rest-spread',
    'transform-class-properties',
  ]
};
