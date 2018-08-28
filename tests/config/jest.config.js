const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  setupFiles: ['./config/jest.setup.js'],
  testMatch: ['**/*.js'],
  transform: {
    '^.+\\.js$': './config/jest.transform.js',
  },
  transformIgnorePatterns: ['node_modules'],
  testPathIgnorePatterns: ['\\node_modules\\', 'config'],
  testURL: 'http://localhost',
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
