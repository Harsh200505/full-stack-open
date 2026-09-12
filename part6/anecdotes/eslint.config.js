import js from '@eslint/js'
import globals from 'globals'
export default [{ ignores: ['dist/**'] }, js.configs.recommended, {
  files: ['**/*.{js,jsx}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: { ...globals.browser, ...globals.node },
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
  rules: { 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z]' }] },
}]
