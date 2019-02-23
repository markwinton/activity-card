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
      files: ['src/**'],
      rules: {
        'react/prop-types': 'off',
        'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
      },
    },
    {
      files: ['src/attribution.js'], 
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: ['test/**'],
      rules: {
        'no-unused-expressions': 'off', 
      },
    },
  ],
}
