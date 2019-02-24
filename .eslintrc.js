module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  parser: 'babel-eslint',
  extends: 'airbnb',
  globals: {
    'env': 'readonly',
  },
  overrides: [
    {
      // skip proptypes, allow import from devDependencies
      files: ['src/**'],
      rules: {
        'react/prop-types': 'off',
        'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
      },
    },
    {
      // exempt @license comments
      files: ['src/attribution.js'], 
      rules: {
        'max-len': 'off',
      },
    },
    {
      // exempt chai bdd assertions
      files: ['test/**'],
      rules: {
        'no-unused-expressions': 'off', 
      },
    },
  ],
}
