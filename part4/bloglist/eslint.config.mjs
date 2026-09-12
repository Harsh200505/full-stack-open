import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    ignores: ['node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node,
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'off',
    },
  },
]
