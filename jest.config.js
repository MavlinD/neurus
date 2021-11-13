module.exports = {
  // ...
  // watchPlugins: ['./tests/test_tools.js'],
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',

  "moduleFileExtensions": [
      "js",
      "json",
      // tell Jest to handle `*.vue` files
      "vue"
    ],

  "transform": {
      // process `*.vue` files with `vue-jest`
      ".*\\.(vue)$": "vue-jest",
      ".*\\.(js)$": "babel-jest"
  },

  "collectCoverage": true,
  "collectCoverageFrom": ["**/*.{js,vue}", "!**/node_modules/**"],
  "transformIgnorePatterns": ["<rootDir>/node_modules/"],
  'verbose': true,

  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.(js)$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  }
};
